import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSellDto } from './dto/create-sell.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sell } from './entities/sell.entity';
import { Model } from 'mongoose';
import generateDate from './utils/generateDate';
import { DateSell } from './entities/date-sell.entity';

@Injectable()
export class SellService {
  constructor(
    @InjectModel(Sell.name)
    private readonly sellModel: Model<Sell>,
    @InjectModel(DateSell.name)
    private readonly dateSellModel: Model<Sell>,
  ) {}

  async createSell(createSellDto: CreateSellDto) {
    const date_hour = generateDate('hour');
    const date_sell = generateDate();
    try {
      const dateFind = await this.dateSellModel.find({ date: date_sell });
      if (dateFind.length == 0) {
        await this.dateSellModel.create({
          date: date_sell,
        });
      }
      const sell = await this.sellModel.create({
        name: createSellDto.name,
        date_hour,
        date_sell,
        category_name: createSellDto.category_name,
        cost: createSellDto.cost,
        price: createSellDto.price,
        image: createSellDto.image.url,
        size_name: createSellDto.size_name,
        method_payment: createSellDto.method_payment,
      });

      return sell;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't create sell - Check server logs`,
      );
    }
  }

  async findAll() {
    try {
      const dateSells = await this.dateSellModel.find();
      return dateSells;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't get categories - Check server logs`,
      );
    }
  }

  async findAllSells(date: string) {
    try {
      const sells = await this.sellModel.find({
        date_sell:date
      })
      return sells;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't get categories - Check server logs`,
      );
    }
  }
}
