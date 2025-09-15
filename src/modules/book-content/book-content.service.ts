import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uuid } from 'src/common/type';
import { BookContent } from 'src/modules/book-content/domain/book-content';
import { BookContentEntity } from 'src/modules/book-content/entity/book-content.entity';
import { IsNull, Repository } from 'typeorm';
import { parseOfficeAsync } from 'officeparser';
import { downloadTmpFile, removeFile, sanitizeText } from 'src/common/utils';
import pLimit from 'p-limit';

@Injectable()
export class BookContentService {
  private readonly logger = new Logger(BookContentService.name);

  constructor(
    @InjectRepository(BookContentEntity)
    private readonly bookContentRepository: Repository<BookContentEntity>,
  ) {}

  async findAll(): Promise<BookContent[]> {
    return BookContent.fromEntities(await this.bookContentRepository.find());
  }

  async findByBookId(bookId: Uuid): Promise<BookContent> {
    return BookContent.fromEntity(await this.findOneOrThrow(bookId));
  }

  async createEmpty(bookId: Uuid, url: string): Promise<BookContent> {
    return BookContent.fromEntity(
      await this.bookContentRepository.save(
        this.bookContentRepository.create({ bookId, url, content: null }),
      ),
    );
  }

  async updateContent(bookId: Uuid, content: string): Promise<BookContent> {
    return BookContent.fromEntity(
      await this.bookContentRepository.save({
        ...(await this.findByBookId(bookId)),
        content,
      }),
    );
  }

  async extractMissingContents(): Promise<void> {
    const bookContents = await this.bookContentRepository.findBy({
      content: IsNull(),
    });

    if (!bookContents.length) {
      this.logger.log('No missing contents found.');
      return;
    }

    const limit = pLimit(3);

    const tasks = bookContents.map((bc) =>
      limit(async () => {
        let filePath: string | undefined;

        try {
          filePath = await downloadTmpFile(bc.url);

          const text: string = await parseOfficeAsync(filePath, {
            newlineDelimiter: '\n',
          });

          await this.updateContent(bc.bookId, sanitizeText(text));

          this.logger.log(`Extracted content for book ${bc.bookId}`);
        } catch (err) {
          this.logger.error(
            `Failed to extract content for book ${bc.bookId}`,
            err,
          );
        } finally {
          if (filePath) {
            await removeFile(filePath).catch((e) =>
              this.logger.error(`Failed to clean temp file: ${filePath}`, e),
            );
          }
        }
      }),
    );

    await Promise.all(tasks);
  }

  private async findOneOrThrow(bookId: Uuid): Promise<BookContentEntity> {
    const entity = await this.bookContentRepository.findOneBy({
      bookId,
    });

    if (!entity) {
      throw new NotFoundException(`Content for book ${bookId} not found`);
    }

    return entity;
  }
}
