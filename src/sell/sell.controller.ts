import { Controller, Post, Body } from '@nestjs/common';
import { SellService } from './sell.service';
import { CreateSellDto } from './dto/create-sell.dto';

@Controller('V1/sells')
export class SellController {
  constructor(private readonly sellService: SellService) {}

  @Post()
  async create(@Body() createSellDto: CreateSellDto) {
    return this.sellService.registerSell(createSellDto);
  }
}