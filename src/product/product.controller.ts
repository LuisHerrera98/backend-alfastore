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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { CategoryAndSizeId } from './dto/category-and-size-id.dto';
import { UpdateSizeDto } from 'src/size/dto/update-size.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image', 1))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() image: Express.Multer.File[],
  ) {
    const imageArray = await this.fileService.uploadImageToCloudinary(image);
    createProductDto.image = imageArray;
    return this.productService.create(createProductDto);
  }

  @Post('products')
  getProductBySizeAndCategory(
    @Body() categoryAndSizeId: CategoryAndSizeId
  ) {
    return this.productService.getProductBySizeAndCategory(categoryAndSizeId);
  }

  @Patch('decrement')
    sizeDecrement(@Body() updateSizeDto: UpdateSizeDto) {
    return this.productService.sizeDecrement( updateSizeDto);
  }

  @Patch('increment')
    sizeIncrement(@Body() updateSizeDto: UpdateSizeDto) {
    return this.productService.sizeIncrement( updateSizeDto);
  }
}
