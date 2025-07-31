# HTTP/2 Server with Load Balancing

HTTP/2 server with advanced load balancing, session management, rate limiting, and extensible architecture. I am building this with TypeScript for real-world, high-performance scenarios.

## What it can do
- HTTP/2 with HTTPS
- Multiple load balancing algorithms
- In-memory and pluggable session management
- Configurable rate limiting
- In-memory caching (with future support for external cache)
- Health checks and metrics
- Extensible request handling

## Getting Started

### Installation
```sh
npm install
```

### Build
```sh
npm run build
```

### Run (development)
```sh
npm run start:dev
```

### Run (production)
```sh
npm start
```

## Configuration
I wrote it in `docs/explanation.md` for architecture and configuration details.

## Documentation
- [docs/explanation.md](docs/explanation.md): Architecture and design
- [docs/whats-next.md](docs/whats-next.md): Roadmap and future plans

## License
MIT