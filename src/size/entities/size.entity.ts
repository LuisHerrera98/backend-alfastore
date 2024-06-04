import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Size extends Document{
    @Prop({
        unique: false,
    })
    name: string;

    @Prop({
        unique: false,
    })
    category_id: string;

    @Prop({
        unique: true,
    })
    unique: string
    
}

export const SizeSchema = SchemaFactory.createForClass(Size)