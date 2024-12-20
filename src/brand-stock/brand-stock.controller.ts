import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandStockService } from './brand-stock.service';
import { CreateBrandStockDto } from './dto/create-brand-stock.dto';
import { UpdateBrandStockDto } from './dto/update-brand-stock.dto';

@Controller('V1/brand-stock')
export class BrandStockController {
  constructor(private readonly brandStockService: BrandStockService) {}

  @Post()
  create(@Body() createBrandStockDto: CreateBrandStockDto) {
    createBrandStockDto.name = createBrandStockDto.name.toUpperCase();
    return this.brandStockService.create(createBrandStockDto);
  }

  @Get(':categoryStock_id')
  findAllByCategoryId(@Param('categoryStock_id') categoryStock_id: string) {
    console.log(categoryStock_id);
    
    return this.brandStockService.findAllByCategoryId(categoryStock_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandStockDto: UpdateBrandStockDto) {
    return this.brandStockService.update(+id, updateBrandStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandStockService.remove(+id);
  }
}
