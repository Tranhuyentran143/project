import { Expose } from 'class-transformer';

export class ProductDto {
  product_id?: number;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  image_url: string;

  @Expose()
  quantity: number;

  @Expose()
  description: string;

  @Expose()
  category_id: number;

}
