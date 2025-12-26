import * as client from 'prom-client';
export declare class MetricsService {
    private readonly registry;
    private readonly httpDuration;
    private readonly httpRequestsTotal;
    constructor();
    getRegistry(): client.Registry<"text/plain; version=0.0.4; charset=utf-8">;
    observeHttp(method: string, route: string, status: number, durationSeconds: number): void;
}
