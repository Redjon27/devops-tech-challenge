import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
  public readonly registry = client.register;

  private static defaultMetricsStarted = false;

  public readonly httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'] as const,
  });

  public readonly httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status_code'] as const,
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
  });

  constructor() {
    if (!MetricsService.defaultMetricsStarted) {
      client.collectDefaultMetrics();
      MetricsService.defaultMetricsStarted = true;
    }
  }

  contentType() {
    return this.registry.contentType;
  }

  metrics() {
    return this.registry.metrics();
  }
}
