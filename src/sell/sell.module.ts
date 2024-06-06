import { Module } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellController } from './sell.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sell, SellSchema } from './entities/sell.entity';
import { DateSell, DateSellSchema } from './entities/date-sell.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';

@Module({
  controllers: [SellController],
  providers: [SellService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Sell.name,
        schema: SellSchema,
      },
      {
        name: DateSell.name,
        schema: DateSellSchema,
      }
    ]),
  ],
})
export class SellModule {}
