import { Product } from '@prisma/client';

export class CreateProductDto {
  vendor: string;
  title: string;
  variants: Product[];
}
