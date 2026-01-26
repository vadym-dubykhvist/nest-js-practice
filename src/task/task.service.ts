import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.log('CRON task runs every 10 seconds');
  }

  @Interval(1000)
  handleInterval() {
    this.logger.log('Interval task runs every second');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.log('Timeout task in 5 seconds before server start');
  }
}
