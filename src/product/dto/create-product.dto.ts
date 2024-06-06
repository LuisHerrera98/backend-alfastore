import { IsString, MinLength } from 'class-validator';

export class CreateProductDto {
 
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  cost: string;

  @IsString()
  price: string;

  @IsString()
  category_id: string;

  image?: typeImage[];

  @IsString()
  stock: string;
}

interface typeImage {
  url: string;
  publicId: string;
}
