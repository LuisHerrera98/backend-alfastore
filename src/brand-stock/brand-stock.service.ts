import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBrandStockDto } from './dto/create-brand-stock.dto';
import { UpdateBrandStockDto } from './dto/update-brand-stock.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BrandStock } from './entities/brand-stock.entity';
import { Model } from 'mongoose';

@Injectable()
export class BrandStockService {
  constructor(
    @InjectModel(BrandStock.name)
    private readonly brandStockModel: Model<BrandStock>,
  ) {}


  async create(createBrandStockDto: CreateBrandStockDto) {
    const brandStock = await this.brandStockModel.create({...createBrandStockDto})
    return brandStock;
  }

  async findAllByCategoryId(categoryStock_id) {
    try {
      const brandsStock = await this.brandStockModel.find({
        categoryStock_id
      });
      return brandsStock;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't get brands - Check server logs`,
      );
    }
  }

  update(id: number, updateBrandStockDto: UpdateBrandStockDto) {
    return `This action updates a #${id} brandStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} brandStock`;
  }
}
