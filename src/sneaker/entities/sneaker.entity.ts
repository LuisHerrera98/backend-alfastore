import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Sneaker extends Document{
    @Prop({
        unique: false,
    })
    name: string;

    @Prop({
        unique: false,
    })
    comentary: string;

    @Prop({
        unique: false,
    })
    model_id: string

    @Prop({
        unique: false
    })
    images: []

    @Prop({
        unique: false,
    })
    price: number;

    @Prop({
        unique: false,
    })
    discount: number;
}

export const SneakerSchema = SchemaFactory.createForClass(Sneaker)