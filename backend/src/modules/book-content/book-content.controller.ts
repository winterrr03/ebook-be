import { Controller } from '@nestjs/common';
import { BookContentService } from './book-content.service';

@Controller('book-contents')
export class BookContentController {
  constructor(private readonly bookContentService: BookContentService) {}
}
