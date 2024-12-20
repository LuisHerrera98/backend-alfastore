import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryStockDto } from './dto/create-category-stock.dto';
import { UpdateCategoryStockDto } from './dto/update-category-stock.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryStock } from './entities/category-stock.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryStockService {

  constructor(
    @InjectModel(CategoryStock.name)
    private readonly categoryStockModel: Model<CategoryStock>,
  ) {}


  async create(createCategoryStockDto: CreateCategoryStockDto) {
    try {

      const exists = await this.categoryStockModel.findOne({
        name: createCategoryStockDto.name,
      });
        
      if (exists) { 
        throw new BadRequestException(
          `Category ${createCategoryStockDto.name} already exists`,
        );
      }
      
      const category = await this.categoryStockModel.create({ ...createCategoryStockDto });
      return category;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Category ${createCategoryStockDto.name} already exists`,
        );
      }
      throw error;
    }
  }

  async findAll() {
    const categoriesStock = await this.categoryStockModel.find();
    return categoriesStock
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryStock`;
  }

  async update(id: string, updateCategoryStockDto: UpdateCategoryStockDto) {
  
    const exists = await this.categoryStockModel.findOne({
      _id: { $ne: id },
      name: updateCategoryStockDto.name
    });
  
    if (exists) {
      throw new BadRequestException(
        `Category stock ${updateCategoryStockDto.name} already exists`
      );
    }
  
    const updatedCategory = await this.categoryStockModel.findByIdAndUpdate(
      id,
      { name: updateCategoryStockDto.name },
      { new: true } 
    );
  
    if (!updatedCategory) {
      throw new BadRequestException(
        `Brand with id ${id} not found`
      );
    }
  
    return updatedCategory;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryStock`;
  }
}
