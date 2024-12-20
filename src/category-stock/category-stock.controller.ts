import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryStockService } from './category-stock.service';
import { CreateCategoryStockDto } from './dto/create-category-stock.dto';
import { UpdateCategoryStockDto } from './dto/update-category-stock.dto';

@Controller('V1/category-stock')
export class CategoryStockController {
  constructor(private readonly categoryStockService: CategoryStockService) {}

  @Post()
  create(@Body() createCategoryStockDto: CreateCategoryStockDto) {
    createCategoryStockDto.name = createCategoryStockDto.name.toUpperCase();
    return this.categoryStockService.create(createCategoryStockDto);
  }

  @Get()
  findAll() {
    return this.categoryStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryStockDto: UpdateCategoryStockDto) {
    updateCategoryStockDto.name = updateCategoryStockDto.name.toUpperCase();
    return this.categoryStockService.update(id, updateCategoryStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryStockService.remove(+id);
  }
}
