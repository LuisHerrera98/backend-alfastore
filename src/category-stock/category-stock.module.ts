import { Module } from '@nestjs/common';
import { CategoryStockService } from './category-stock.service';
import { CategoryStockController } from './category-stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryStock, CategoryStockSchema } from './entities/category-stock.entity';

@Module({
  controllers: [CategoryStockController],
  providers: [CategoryStockService],
  imports: [
    MongooseModule.forFeature([
      {
        name: CategoryStock.name,
        schema: CategoryStockSchema
      }

    ])
  ]
})
export class CategoryStockModule {}
