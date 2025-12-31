import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry = new client.Registry();

  constructor() {
    // Collect default metrics ONLY once for this registry
    if (!this.registry.getSingleMetric('process_cpu_user_seconds_total')) {
      client.collectDefaultMetrics({ register: this.registry });
    }
  }

  contentType(): string {
    return this.registry.contentType;
  }

  async metrics(): Promise<string> {
    return this.registry.metrics();
  }
}
