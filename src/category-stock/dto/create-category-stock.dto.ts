import { IsString, MinLength } from "class-validator";

export class CreateCategoryStockDto {
    @IsString()
    @MinLength(1)
    name: string;
}