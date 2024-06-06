import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SellService } from './sell.service';
import { CreateSellDto } from './dto/create-sell.dto';


@Controller('sell')
export class SellController {
  constructor(private readonly sellService: SellService) {}

  @Post()
  createSell(@Body() createSellDto: CreateSellDto) {
    return this.sellService.createSell(createSellDto);
  }

  @Get()
  findAll() {
    return this.sellService.findAll();
  }

  @Get(':date')
  findAllSells(@Param('date') date: string) {
    return this.sellService.findAllSells(date);
  }

}
