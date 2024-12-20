import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileService } from 'src/file/file.service';
import { SellModule } from 'src/sell/sell.module';

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
    SellModule
  ],
})
export class ProductModule {}
