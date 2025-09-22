import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/modules/book/entity/book.entity';
import { BookContentModule } from 'src/modules/book-content/book-content.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), BookContentModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
