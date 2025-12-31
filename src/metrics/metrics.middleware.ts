import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metrics: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
      const diffNs = process.hrtime.bigint() - start;
      const durationSec = Number(diffNs) / 1e9;

      const method = req.method;
      const route = (req as any).route?.path || req.path || 'unknown';
      const status_code = String(res.statusCode);

      this.metrics.httpRequestsTotal.inc({ method, route, status_code });
      this.metrics.httpRequestDuration.observe({ method, route, status_code }, durationSec);
    });

    next();
  }
}
