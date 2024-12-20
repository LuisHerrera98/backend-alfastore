import { IsMongoId, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateSneakerDto {
  @IsString()
  @MinLength(1)
  name: string;

  @MinLength(1)
  comentary?: string;

  @IsMongoId()
  model_id: string;

  images?: string[];

  @IsOptional()
  price: any;

  @IsOptional()
  discount: any;
}
