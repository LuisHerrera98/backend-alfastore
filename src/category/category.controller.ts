import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image', 1))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles() image: Express.Multer.File[],
  ) {
    const imageArray = await this.fileService.uploadImageToCloudinary(image);
    createCategoryDto.image = imageArray;
    console.log(createCategoryDto);
    
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
