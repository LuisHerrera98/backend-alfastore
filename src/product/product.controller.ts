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
import { FileService } from 'src/file/file.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('V1/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 4))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    if (typeof createProductDto.stock === 'string') {
      createProductDto.stock = JSON.parse(createProductDto.stock);
    }

    createProductDto.stock = createProductDto.stock.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
    }));

    const imagesArray = await this.fileService.uploadImageToCloudinary(images);
    createProductDto.images = imagesArray;
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {

    console.log(updateProductDto);
    
    return this.productService.update(id, updateProductDto);
  }

  @Get('by-size/:sizeId')
  async getAllBySizeId(@Param('sizeId') sizeId: string) {
    return this.productService.findAllBySizeId(sizeId);
  }

  @Patch(':id/increment/:sizeId')
  async incrementQuantity(
    @Param('id') id: string,
    @Param('sizeId') sizeId: string,
  ) {
    return this.productService.incrementQuantity(id, sizeId);
  }

  @Patch(':id/decrement/:sizeId')
  async decrementQuantity(
    @Param('id') id: string,
    @Param('sizeId') sizeId: string,
  ) {
    return this.productService.decrementQuantity(id, sizeId);
  }
}