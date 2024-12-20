import { IsString, MinLength, IsMongoId } from "class-validator";

export class CreateModelDto {
    
    @IsString()
    @MinLength(1)
    name: string;

    @IsMongoId()
    brand_id: string
}