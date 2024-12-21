import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SellService } from './sell.service';
import { CreateSellDto } from './dto/create-sell.dto';
import { Types } from 'mongoose';

@Controller('V1/sells')
export class SellController {
  constructor(private readonly sellService: SellService) {}
  
  @Get('dateSells')
  async findDateSells(){
    return this.sellService.findDateSells();
  }

  @Get(':dateSellId')
async getSellsByDateSellId(@Param('dateSellId') dateSellId: string) {
  const objectId = new Types.ObjectId(dateSellId);
  return this.sellService.getSellsByDateSellId(objectId);
}

  @Post()
  async create(@Body() createSellDto: CreateSellDto) {
    return this.sellService.registerSell(createSellDto);
  }

}