import { IsMongoId, IsString, MinLength } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsMongoId()
  categoryStock_id: string;
}