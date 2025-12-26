import { Response } from 'express';
import { MetricsService } from './metrics.service';
export declare class MetricsController {
    private readonly metrics;
    constructor(metrics: MetricsService);
    metricsEndpoint(res: Response): Promise<void>;
}
