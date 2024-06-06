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
  ){}


  async create(createSizeDto: CreateSizeDto) {
    createSizeDto.unique = createSizeDto.name + createSizeDto.category_id;
    try {
      const size = await this.sizeModel.create({...createSizeDto})
      return size;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Size exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }

      console.log(error);
      throw new InternalServerErrorException(
        `Can't create size - Check server logs`,
      );
    }
  }

  async findAllByCategoryId(category_id: string) {
    try {
      const sizes = await this.sizeModel.find({category_id})
      return sizes;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't get sizes - Check server logs`,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} size`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} size`;
  }
}
