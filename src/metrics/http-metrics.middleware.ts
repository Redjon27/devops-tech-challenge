import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class HttpMetricsMiddleware implements NestMiddleware {
  constructor(private readonly metrics: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
      const end = process.hrtime.bigint();
      const durationSeconds = Number(end - start) / 1e9;

      // Use route path if available, fallback to raw path
      const route =
        (req as any).route?.path ||
        (req as any).baseUrl ||
        req.path ||
        'unknown';

      this.metrics.observeHttp(req.method, route, res.statusCode, durationSeconds);
    });

    next();
  }
}
