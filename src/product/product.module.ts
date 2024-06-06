import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FileService } from 'src/file/file.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService, FileService, CloudinaryService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
})
export class ProductModule {}
