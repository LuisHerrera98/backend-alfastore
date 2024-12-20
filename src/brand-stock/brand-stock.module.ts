import { Module } from '@nestjs/common';
import { BrandStockService } from './brand-stock.service';
import { BrandStockController } from './brand-stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandStock, BrandStockSchema } from './entities/brand-stock.entity';

@Module({
  controllers: [BrandStockController],
  providers: [BrandStockService],
  imports: [
    MongooseModule.forFeature([
      {
        name: BrandStock.name,
        schema: BrandStockSchema
      }
    ])
  ]
})
export class BrandStockModule {}
