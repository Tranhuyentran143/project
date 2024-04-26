import { Expose } from "class-transformer";

export class CategoryDto {
    @Expose()
    category_id: number;
    
    @Expose()
    category_name: string;
  }
  