import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ShopifyService } from '../shopify/shopify.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, ShopifyService],
})
export class ProductsModule {}
