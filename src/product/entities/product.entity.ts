import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Product extends Document{
    @Prop({
        unique: false,
    })
    name: string;

    @Prop({
        unique: false,
        required: false
    })
    categoryStock_id: string;
    
    @Prop({
        unique: false,
    })
    cost: number;

    @Prop({
        unique: false,
    })
    price: number;

    @Prop({
        unique: false
    })
    images: []

    @Prop({
        unique: false
    })
    stock: any[]

}

export const ProductSchema = SchemaFactory.createForClass(Product)