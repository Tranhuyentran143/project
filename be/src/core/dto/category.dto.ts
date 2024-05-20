import { Expose } from 'class-transformer';

export class CategoryDto {
  category_id?: number;

  @Expose()
  category_name: string;
}
