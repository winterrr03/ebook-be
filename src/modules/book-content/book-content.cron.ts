import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BookContentService } from './book-content.service';
import { parseOfficeAsync } from 'officeparser';
import { downloadTmpFile, removeFile } from 'src/common/utils';

@Injectable()
export class BookContentCron {
  private readonly logger = new Logger(BookContentCron.name);

  constructor(private readonly bookContentService: BookContentService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleExtractBookContents() {
    this.logger.log('Running book content extraction job...');

    const bookContents = await this.bookContentService.findAll();

    for (const bookContent of bookContents) {
      if (!bookContent.url || bookContent.content) continue;

      let filePath: string | undefined;

      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const text: string = await parseOfficeAsync(
          await downloadTmpFile(bookContent.url),
          {
            newlineDelimiter: '\n',
          },
        );

        await this.bookContentService.updateContent(bookContent.bookId, text);

        this.logger.log(`Extracted content for book ${bookContent.bookId}`);
      } catch (err) {
        this.logger.error(
          `Failed to extract content for book ${bookContent.bookId}`,
          err,
        );
      } finally {
        if (filePath) {
          await removeFile(filePath);
        }
      }
    }
  }
}
