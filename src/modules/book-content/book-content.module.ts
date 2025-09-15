import { Module } from '@nestjs/common';
import { BookContentService } from './book-content.service';
import { BookContentController } from './book-content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookContentEntity } from 'src/modules/book-content/entity/book-content.entity';
import { BookContentCron } from 'src/modules/book-content/book-content.cron';

@Module({
  imports: [TypeOrmModule.forFeature([BookContentEntity])],
  controllers: [BookContentController],
  providers: [BookContentService, BookContentCron],
  exports: [BookContentService],
})
export class BookContentModule {}
