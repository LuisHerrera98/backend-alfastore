import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Sell extends Document{
    @Prop({
        unique: false,
      })
      name: string;

      @Prop({
        unique: false,
      })
      date_hour: string;

      @Prop({
        unique: false,
      })
      date_sell: string;

      @Prop({
        unique: false,
      })
      category_name: string;

      @Prop({
        unique: false,
      })
      cost: number;

      @Prop({
        unique: false,
      })
      price: number;

      @Prop({
        unique: false,
      })
      image: string;

      @Prop({
        unique: false,
      })
      size_name: string;

      @Prop({
        unique: false,
      })
      method_payment: string;
}

export const SellSchema = SchemaFactory.createForClass(Sell);