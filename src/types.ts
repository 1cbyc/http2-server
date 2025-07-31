export interface ServerConfig {
  port: number
  cert: string
  key: string
  sessionTimeout: number
}

export type LoadBalancingAlgorithm =
  | 'round-robin'
  | 'least-connections'
  | 'weighted-round-robin'
  | 'ip-hash'
  | 'least-response-time'
  | 'consistent-hashing'

export interface LoadBalancerConfig {
  algorithm: LoadBalancingAlgorithm
  healthCheckInterval: number
}

export interface BackendConfig {
  url: string
  weight: number
  maxConnections: number
}

export interface Metrics {
  requestCount: number
  errorCount: number
  averageResponseTime: number
}

export interface SessionConfig {
  secret: string
  maxAge: number
}

export interface RateLimitConfig {
  windowMs: number
  max: number
}

export interface CacheConfig {
  maxSize: number
  ttl: number
}
