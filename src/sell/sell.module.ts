import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DateSell, DateSellSchema } from './entities/sell.entity';
import { Sell, SellSchema } from './entities/sell.entity';
import { SellService } from './sell.service';
import { SellController } from './sell.controller';

@Module({
  controllers: [SellController],
  imports: [
    MongooseModule.forFeature([
      { name: DateSell.name, schema: DateSellSchema },
      { name: Sell.name, schema: SellSchema }
    ])
  ],
  providers: [SellService],
  exports: [SellService]
})
export class SellModule {}