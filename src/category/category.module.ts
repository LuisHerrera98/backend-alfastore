import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileService } from 'src/file/file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService,FileService, CloudinaryService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
})
export class CategoryModule {}
