import { IsMongoId, IsString, MinLength } from "class-validator";

export class CreateBrandStockDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsMongoId()
    categoryStock_id: string
}