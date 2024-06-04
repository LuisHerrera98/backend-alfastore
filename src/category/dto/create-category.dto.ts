import { IsString, MinLength, IsMongoId } from "class-validator";

export class CreateCategoryDto {
    
    @IsString()
    @MinLength(1)
    name: string;

    image?: typeImage[]
}

interface typeImage {
    url: string;
    publicId: string;
}