import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
  }

  @Get(':category_id')
  findAllByCategoryId(@Param('category_id') category_id: string) {
    return this.sizeService.findAllByCategoryId(category_id);
  }
}
