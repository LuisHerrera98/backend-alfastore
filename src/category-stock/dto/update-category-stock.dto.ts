import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryStockDto } from './create-category-stock.dto';

export class UpdateCategoryStockDto extends PartialType(CreateCategoryStockDto) {}
