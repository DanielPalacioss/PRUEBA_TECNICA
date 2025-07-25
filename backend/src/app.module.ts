import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ShopifyService } from './shopify/shopify.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [PrismaService, ShopifyService],
})
export class AppModule {}
