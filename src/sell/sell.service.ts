import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DateSell } from './entities/sell.entity';
import { Sell } from './entities/sell.entity';
import { CreateSellDto } from './dto/create-sell.dto';

@Injectable()
export class SellService {
  constructor(
    @InjectModel(DateSell.name) private dateSellModel: Model<DateSell>,
    @InjectModel(Sell.name) private sellModel: Model<Sell>,
  ) {}

  private formatDateToSpanish(date: Date): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return `${dayName} ${day} de ${month}`;
  }

  private async getOrCreateDateSell(): Promise<DateSell> {
    const today = new Date();
    today.setHours(today.getHours() - 3);
    
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
  
    let dateSell = await this.dateSellModel.findOne({
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });
  
    if (!dateSell) {
      const name = this.formatDateToSpanish(today);
      dateSell = await this.dateSellModel.create({
        name,
        date: startOfDay
      });
    }
  
    return dateSell;
  }

  async registerSell(createSellDto: CreateSellDto): Promise<Sell> {
    const dateSell = await this.getOrCreateDateSell();

    const sell = await this.sellModel.create({
      ...createSellDto,
      dateSell_id: dateSell._id
    });

    return sell;
  }

  async findDateSells() {
    try {
      const dateSells = await this.dateSellModel
        .find({})
        .sort({date: -1})
      return dateSells;
    } catch (error) {
      throw new BadRequestException('Error al obtener las ventas por fecha: ' + error.message);
    }
   }

   async getSellsByDateSellId (dateSellId: Types.ObjectId) {
    try {
      const sells = await this.sellModel
        .find({
          dateSell_id: dateSellId
        })
        .sort({date: -1})
      return sells;
    } catch (error) {
      throw new BadRequestException('Error al obtener las ventas por fecha: ' + error.message);
    }
   }
}