import * as http2 from 'http2'
import { BackendConfig, Metrics } from './types'

export class Backend {
  private connections = 0
  private health = true
  private lastResponseTime = 0
  private session: http2.ClientHttp2Session | null = null
  private metrics: Metrics = { requestCount: 0, errorCount: 0, averageResponseTime: 0 }
  private config: BackendConfig

  constructor(config: BackendConfig) {
    this.config = config
    this.initSession()
  }

  private initSession() {
    this.session = http2.connect(this.config.url)
    this.session.on('error', () => {
      this.health = false
      this.session = null
      setTimeout(() => this.initSession(), 5000)
    })
  }

  async handleRequest(headers: http2.IncomingHttpHeaders, payload: Buffer): Promise<{ responseHeaders: http2.IncomingHttpHeaders, responseData: Buffer }> {
    if (!this.session) throw new Error('Backend session not available')
    return new Promise((resolve, reject) => {
      const startTime = Date.now()
      const stream = this.session!.request(headers)
      const responseData: Buffer[] = []
      let responseHeaders: http2.IncomingHttpHeaders = {}
      stream.on('response', (headers) => {
        responseHeaders = headers
      })
      stream.on('data', (chunk) => {
        responseData.push(chunk)
      })
      stream.on('end', () => {
        this.lastResponseTime = Date.now() - startTime
        this.updateMetrics(this.lastResponseTime)
        resolve({ responseHeaders, responseData: Buffer.concat(responseData) })
      })
      stream.on('error', () => {
        this.metrics.errorCount++
        reject(new Error('Backend stream error'))
      })
      stream.end(payload)
    })
  }

  private updateMetrics(responseTime: number) {
    this.metrics.requestCount++
    this.metrics.averageResponseTime = (this.metrics.averageResponseTime * (this.metrics.requestCount - 1) + responseTime) / this.metrics.requestCount
  }

  incrementConnections() {
    this.connections++
  }

  decrementConnections() {
    this.connections--
  }

  getConnections() {
    return this.connections
  }

  setHealth(status: boolean) {
    this.health = status
  }

  isHealthy() {
    return this.health && this.connections < this.config.maxConnections
  }

  getLastResponseTime() {
    return this.lastResponseTime
  }

  getWeight() {
    return this.config.weight
  }

  getMetrics() {
    return { ...this.metrics }
  }
}
