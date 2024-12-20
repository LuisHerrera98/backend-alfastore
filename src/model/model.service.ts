import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Models } from './entities/model.entity';
import { Model } from 'mongoose';

@Injectable()
export class ModelService {
  constructor(
    @InjectModel(Models.name)
    private readonly modelModels: Model<Models>,
  ) {}

  async create(createModelDto: CreateModelDto) {
    try {
      createModelDto.name = createModelDto.name.toUpperCase();

      const exists = await this.modelModels.findOne({
        name: createModelDto.name,
        brand_id: createModelDto.brand_id,
      });

      if (exists) {
        throw new BadRequestException(
          `Modelo ${createModelDto.name} ya existe en esta marca`,
        );
      }

      const model = await this.modelModels.create({ ...createModelDto });
      return model;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `El modelo ${createModelDto.name} ya existe en marca`,
        );
      }
      throw error;
    }
  }

  findAll() {
    const models = this.modelModels.find();
    return models;
  }

  findByBrand(brand_id: string) {
    const models = this.modelModels.find({
      brand_id,
    });
    return models;
  }

  async update(id: string, updateModelDto: UpdateModelDto) {

    const exists = await this.modelModels.findOne({
      _id: { $ne: id },
      name: updateModelDto.name,
    });

    if (exists) {
      throw new BadRequestException(
        `Brand ${updateModelDto.name} already exists`,
      );
    }

    const updatedBrand = await this.modelModels.findByIdAndUpdate(
      id,
      { name: updateModelDto.name },
      { new: true },
    );

    if (!updatedBrand) {
      throw new BadRequestException(`Model with id ${id} not found`);
    }

    return updatedBrand;
  }

  remove(id: number) {
    return `This action removes a #${id} model`;
  }
}
