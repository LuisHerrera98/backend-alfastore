import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'category-stock' })
export class CategoryStock extends Document {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  name: string;

}

export const CategoryStockSchema = SchemaFactory.createForClass(CategoryStock);
