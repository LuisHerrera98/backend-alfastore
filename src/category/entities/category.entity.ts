import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'category' })
export class Category extends Document {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  name: string;

  @Prop()
  category_id: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
