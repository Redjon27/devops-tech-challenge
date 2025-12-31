import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MetricsModule } from './metrics/metrics.module';
import { MetricsMiddleware } from './metrics/metrics.middleware';

import { HealthController } from './health.controller';
import { AppController } from './app.controller';
import { VisitsModule } from './visits/visits.module';

const mongoUri = (process.env.MONGODB_URI || '').trim();
const hasDb =
  mongoUri.length > 0 &&
  mongoUri.toLowerCase() !== 'undefined' &&
  mongoUri.toLowerCase() !== 'null';

@Module({
  imports: [
    MetricsModule,
    ...(hasDb ? [MongooseModule.forRoot(mongoUri), VisitsModule] : []),
  ],
  controllers: [
    HealthController,
    ...(hasDb ? [AppController] : []),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
