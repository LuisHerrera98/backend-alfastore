import { IsString, MinLength } from 'class-validator';

export class CategoryAndSizeId {
  @IsString()
  @MinLength(1)
  size_id: string;

  @IsString()
  @MinLength(1)
  category_id: string;
}

