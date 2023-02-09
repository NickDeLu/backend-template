import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.providers';
import { CategoryService } from './category.service';

@Module({
  imports: [DatabaseModule],
  providers: [...categoryProviders, CategoryService],
  exports: [...categoryProviders],
  controllers: [CategoryController],
})
export class CategoryModule {}