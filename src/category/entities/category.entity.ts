import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Category extends Document{
    @Prop({
        unique: true,
    })
    name: string;

    @Prop({
        unique: false
    })
    image: []
}

export const CategorySchema = SchemaFactory.createForClass(Category)