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
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileService } from 'src/file/file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

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
  async getAllBySizeId(
    @Param('sizeId') sizeId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
  ) {
    return this.productService.findAllBySizeId(sizeId, page, limit);
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

  @Get('inversion')
  async getInversion() {
    return this.productService.getInversion();
  }

  @Delete(':id')
  async delete( @Param('id') id: ObjectId, ) {
    console.log(id);
    
    return this.productService.delete(id);
  }
}
