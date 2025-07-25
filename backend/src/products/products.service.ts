import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShopifyService } from '../shopify/shopify.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private prismaService: PrismaService,
    private shopifyService: ShopifyService,
  ) {}

  async create() {
    const products: Product[] = await this.shopifyService.getProducts();
    await this.prismaService.product.createMany({
      data: products,
    });
    return 'Products Created';
  }

  async findAll(vendor?: string): Promise<Product[]> {
    return this.prismaService.product.findMany({
      where: vendor ? { vendor } : undefined,
    });
  }
}
