import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandStockDto } from './create-brand-stock.dto';

export class UpdateBrandStockDto extends PartialType(CreateBrandStockDto) {}
