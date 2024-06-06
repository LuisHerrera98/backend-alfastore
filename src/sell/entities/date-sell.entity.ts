import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class DateSell extends Document{
    @Prop({
        unique: false,
      })
      date: string;
}

export const DateSellSchema = SchemaFactory.createForClass(DateSell);