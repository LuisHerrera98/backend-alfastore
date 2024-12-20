import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Models extends Document {
   @Prop()
   name: string;

   @Prop()
   brand_id: string;
}

export const ModelSchema = SchemaFactory.createForClass(Models);
ModelSchema.index({ name: 1, brand_id: 1 }, { unique: true });
