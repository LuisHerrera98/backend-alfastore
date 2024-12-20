import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'brands' })
export class Brand extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop()
  category_id: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
