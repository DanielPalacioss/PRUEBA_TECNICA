import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as process from 'node:process';
import {
  CreateProductDto,
} from '../products/dto/create-product.dto';
import { Product } from '@prisma/client';

interface ShopifyResponse {
  products: CreateProductDto[];
}

@Injectable()
export class ShopifyService {
  async getProducts(): Promise<Product[]> {
    const response = await axios.get<ShopifyResponse>(
      `https://${process.env.URL}/admin/api/${process.env.API_VERSION}/products.json`,
      {
        headers: {
          'X-Shopify-Access-Token': process.env.TOKEN,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response.data.products);
    return response.data.products.flatMap((product) =>
      product.variants.map((variant) => ({
        id: variant.id,
        product_id: variant.product_id,
        title: product.title,
        vendor: product.vendor ?? '',
        image: variant.image ?? '',
        created_at: new Date(variant.created_at),
        updated_at: new Date(variant.updated_at),
        price: variant.price,
      })),
    );
  }
}
