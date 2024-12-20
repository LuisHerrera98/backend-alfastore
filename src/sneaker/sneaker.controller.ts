import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SneakerService } from './sneaker.service';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { FileService } from 'src/file/file.service';

@Controller('V1/sneaker')
export class SneakerController {
  constructor(
    private readonly sneakerService: SneakerService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 4))
  async create(
    @Body() createSneakerDto: CreateSneakerDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    
    const imagesArray = await this.fileService.uploadImageToCloudinary(images);
    createSneakerDto.images = imagesArray;

    return this.sneakerService.create(createSneakerDto);
  }

  @Get()
  findAll() {
    return this.sneakerService.findAll();
  }

  @Get(':model_id')
  findByModel(
    @Param('model_id') model_id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
  ) {
    return this.sneakerService.findByModel(model_id, page, limit);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSneakerDto: UpdateSneakerDto) {
    updateSneakerDto.name = updateSneakerDto.name.toUpperCase();
    return this.sneakerService.update(id, updateSneakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sneakerService.remove(id);
  }
}
