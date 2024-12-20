import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      createBrandDto.name = createBrandDto.name.toUpperCase();
      const exists = await this.brandModel.findOne({
        name: createBrandDto.name,
        category_id: createBrandDto.category_id
      });
        
      if (exists) {
        console.log(exists);
        
        throw new BadRequestException(
          `Brand ${createBrandDto.name} already exists`,
        );
      }
      
      const brand = await this.brandModel.create({ ...createBrandDto });
      return brand;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Brand ${createBrandDto.name} already exists`,
        );
      }
      throw error;
    }
  }

  async findAllByCategoryId(category_id) {
    try {
      const brands = await this.brandModel.find({
        category_id
      });
      return brands;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't get sneaker - Check server logs`,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    // Primero verificamos si existe otro brand con el mismo nombre
    const exists = await this.brandModel.findOne({
      _id: { $ne: id },  // Excluimos el brand actual de la búsqueda
      name: updateBrandDto.name
    });
  
    if (exists) {
      throw new BadRequestException(
        `Brand ${updateBrandDto.name} already exists`
      );
    }
  
    // Intentamos actualizar el brand
    const updatedBrand = await this.brandModel.findByIdAndUpdate(
      id,
      { name: updateBrandDto.name },
      { new: true }  // Esto hace que retorne el documento actualizado
    );
  
    // Si no se encontró el brand, lanzamos error
    if (!updatedBrand) {
      throw new BadRequestException(
        `Brand with id ${id} not found`
      );
    }
  
    return updatedBrand;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
