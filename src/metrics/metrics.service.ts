import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry: client.Registry;
  private readonly httpDuration: client.Histogram<string>;
  private readonly httpRequestsTotal: client.Counter<string>;

  constructor() {
    this.registry = new client.Registry();

    // Default metrics (CPU, memory, event loop, etc.)
    client.collectDefaultMetrics({ register: this.registry });

    // Request count (for error rates)
    this.httpRequestsTotal = new client.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
      registers: [this.registry],
    });

    // Request latency (for request latency/p95)
    this.httpDuration = new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
      registers: [this.registry],
    });
  }

  getRegistry() {
    return this.registry;
  }

  observeHttp(method: string, route: string, status: number, durationSeconds: number) {
    const statusStr = String(status);
    this.httpRequestsTotal.labels(method, route, statusStr).inc();
    this.httpDuration.labels(method, route, statusStr).observe(durationSeconds);
  }
}
