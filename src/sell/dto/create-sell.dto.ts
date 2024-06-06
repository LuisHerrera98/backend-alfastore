import { IsArray, IsNumber, IsObject, IsString, MinLength } from 'class-validator';

export class CreateSellDto {
 
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  size_name: string;

  @IsString()
  category_name: string;

  @IsNumber()
  cost: number;

  @IsNumber()
  price: number;

  @IsString()
  method_payment: string;

  @IsObject()
  image: {
    url: string
  };
}
