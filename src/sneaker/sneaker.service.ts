import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { Sneaker } from './entities/sneaker.entity';
import { Model } from 'mongoose';
import { PaginatedResponse } from './interfaces/index.interface';

@Injectable()
export class SneakerService {
  constructor(
    @InjectModel(Sneaker.name)
    private readonly sneakerModel: Model<Sneaker>,
  ) {}

  

  async create(createSneakerDto: CreateSneakerDto) {
    const sneaker = await this.sneakerModel.create({...createSneakerDto});

    return sneaker;
  }

  async findAll() {
    try {
      const sneakers = await this.sneakerModel.find({});
      return sneakers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't get sneaker - Check server logs`,
      );
    }
  }

  async findByModel(model_id: string, page: number = 1, limit: number = 8): Promise<PaginatedResponse> {
    const skip = (page - 1) * limit;
   
    const [sneakers, total] = await Promise.all([
      this.sneakerModel.find({ model_id })
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 })
        .lean()
        .exec(),
      this.sneakerModel.countDocuments({ model_id })
    ]);
   
    return {
      data: sneakers.map(sneaker => ({
        ...sneaker,
        images: sneaker.images.map((img: any) => ({
          url: img.url,
          publicId: img.publicId
        }))
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
   }

  async update(id: string, updateSneakerDto: UpdateSneakerDto) {
  
    const updatedSneaker = await this.sneakerModel.findByIdAndUpdate(
      id,
      { ...updateSneakerDto },
      { new: true }
    );
  
    if (!updatedSneaker) {
      throw new BadRequestException(
        `Sneaker with id ${id} not found`
      );
    }
  
    return updatedSneaker;
  }

  async remove(id: string) {
    await this.sneakerModel.deleteOne({
      _id: id
    })

    return 'delete sneaker';
  }
}
