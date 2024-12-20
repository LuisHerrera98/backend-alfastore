import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Size } from './entities/size.entity';
import { Model } from 'mongoose';

@Injectable()
export class SizeService {
  constructor(
    @InjectModel(Size.name)
    private readonly sizeModel: Model<Size>,
  ) {}

  async create(createSizeDto: CreateSizeDto) {
    try {
      const exists = await this.sizeModel.findOne({
        name: createSizeDto.name,
        categoryStock_id: createSizeDto.categoryStock_id,
      });

      if (exists) {
        console.log(exists);

        throw new BadRequestException(
          `Size ${createSizeDto.name} already exists`,
        );
      }

      const size = await this.sizeModel.create(createSizeDto);
      return size;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Size exists in db ${JSON.stringify(error.keyValue)} `,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(
        `Can't create size - Check server logs`,
      );
    }
  }

  async findAllByCategoryId(categoryStock_id: string) {
    try {
      const sizes = await this.sizeModel.find({
        categoryStock_id,
      });
      return sizes;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't get sizes - Check server logs`,
      );
    }
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    try {
      if (updateSizeDto.name)
        updateSizeDto.name = updateSizeDto.name.toUpperCase();

      const exists = await this.sizeModel.findOne({
        name: updateSizeDto.name,
        categoryStock_id: updateSizeDto.categoryStock_id,
      });

      if (exists) {
        console.log(exists);

        throw new BadRequestException(
          `Size ${updateSizeDto.name} already exists`,
        );
      }

      await this.sizeModel.findByIdAndUpdate(id, updateSizeDto);
      return updateSizeDto;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        `Size ${updateSizeDto.name} already exists`,
      );
    }
  }
}
