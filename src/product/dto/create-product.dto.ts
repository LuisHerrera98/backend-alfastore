import { IsOptional, IsString, MinLength } from 'class-validator';

export class StockItem {
  size_id: string;
  size_name: string;
  quantity: number;
}

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @MinLength(1)
  categoryStock_id: string;

  @IsOptional()
  cost: any;

  @IsOptional()
  price: any;

  @IsOptional()
  images: string[];

  @IsOptional()
  stock: StockItem[];
}
