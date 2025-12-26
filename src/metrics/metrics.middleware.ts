import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metrics: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
      const end = process.hrtime.bigint();
      const durationSeconds = Number(end - start) / 1e9;

      // NOTE: route mund të dalë undefined; fallback tek path
      const route =
        (req.route && (req.route.path as string)) ||
        (req.baseUrl ? `${req.baseUrl}${req.path}` : req.path) ||
        'unknown';

      const labels = {
        method: req.method,
        route,
        status_code: String(res.statusCode),
      };

      this.metrics.httpRequestsTotal.inc(labels);
      this.metrics.httpRequestDuration.observe(labels, durationSeconds);
    });

    next();
  }
}
