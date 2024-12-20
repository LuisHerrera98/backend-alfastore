import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSellDto {
  @IsString()
  product_id: string;

  @IsString()
  product_name: string;

  @IsString()
  size_id: string;

  @IsString()
  size_name: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  cost: number;

  @IsOptional()
  images: any[];
}