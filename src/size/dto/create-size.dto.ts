import { IsString, MinLength, IsMongoId } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsMongoId()
  category_id: string;

  unique?: string
}
