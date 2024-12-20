import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'brands' })
export class BrandStock extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop()
  categoryStock_id: string;
}

export const BrandStockSchema = SchemaFactory.createForClass(BrandStock);
