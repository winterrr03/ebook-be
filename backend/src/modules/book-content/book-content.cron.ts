import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BookContentService } from './book-content.service';

@Injectable()
export class BookContentCron {
  private readonly logger = new Logger(BookContentCron.name);
  private isRunning = false;

  constructor(private readonly bookContentService: BookContentService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleExtractBookContents() {
    if (this.isRunning) {
      this.logger.warn('Previous job still running, skip this cycle.');
      return;
    }

    this.isRunning = true;

    this.logger.log('Running book content extraction job...');

    try {
      await this.bookContentService.extractMissingContents();
    } catch (err) {
      this.logger.error('Unexpected error in cron job', err);
    } finally {
      this.isRunning = false;
    }
  }
}
