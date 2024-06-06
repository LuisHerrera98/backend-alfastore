import { IsString } from 'class-validator';

export class UpdateSizeDto {
  @IsString()
  product_id: string;

  @IsString()
  size_id: string;
}
