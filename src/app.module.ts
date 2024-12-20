import { Module } from '@nestjs/common';
import { SneakerModule } from './sneaker/sneaker.module';
import { SizeModule } from './size/size.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { FileModule } from './file/file.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { CategoryModule } from './category/category.module';
import { CategoryStockModule } from './category-stock/category-stock.module';
import { BrandStockModule } from './brand-stock/brand-stock.module';
import { ProductModule } from './product/product.module';
import { SellModule } from './sell/sell.module';

@Module({
  imports: [
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Lucho:mision2017@db-trendsneakers.bday4jw.mongodb.net/dev-trendsneakers',
    ),
    SneakerModule,
    SizeModule,
    CommonModule,
    FileModule,
    BrandModule,
    ModelModule,
    CategoryModule,
    CategoryStockModule,
    BrandStockModule,
    ProductModule,
    SellModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
