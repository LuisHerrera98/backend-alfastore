import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { FileService } from 'src/file/file.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    private readonly fileService: FileService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create({
        ...createCategoryDto,
      });
      return category;
    } catch (error) {
      if (error.code === 11000) {
        const publicIdArray = createCategoryDto.image.map(
          (objeto) => objeto.publicId,
        );
        this.fileService.deleteImage(publicIdArray);

        throw new BadRequestException(
          `Category exists in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(
        `Can't create category - Check server logs`,
      );
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel.find();
      return categories;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't get categories - Check server logs`,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
