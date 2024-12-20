import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {

      const exists = await this.categoryModel.findOne({
        name: createCategoryDto.name,
      });

      if (exists) {
        throw new BadRequestException(
          `Category ${createCategoryDto.name} already exists`,
        );
      }

      const category = await this.categoryModel.create({ ...createCategoryDto });
      return category;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Category ${createCategoryDto.name} already exists`,
        );
      }
      throw error;
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel.find({});
      return categories;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't get sneaker - Check server logs`,
      );
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const exists = await this.categoryModel.findOne({
      _id: { $ne: id },
      name: updateCategoryDto.name
    });
  
    if (exists) {
      throw new BadRequestException(
        `Categoria ${updateCategoryDto.name} already exists`
      );
    }

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      { name: updateCategoryDto.name },
      { new: true }
    );
  
    if (!updateCategoryDto) {
      throw new BadRequestException(
        `Category with id ${id} not found`
      );
    }
  
    return updatedCategory;
  }

}
