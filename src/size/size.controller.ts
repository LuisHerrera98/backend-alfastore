import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('V1/size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    createSizeDto.name = createSizeDto.name.toUpperCase();
    return this.sizeService.create(createSizeDto);
  }

  @Get(':categoryStock_id')
  findAllByCategoryId(@Param('categoryStock_id') categoryStock_id: string) {
    return this.sizeService.findAllByCategoryId(categoryStock_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(id, updateSizeDto);
  }

}
