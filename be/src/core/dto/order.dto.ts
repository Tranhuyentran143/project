import { CartItemEntity } from '../entity/cartItem.entity';
import { ProductDto } from './product.dto';
import { UserDto } from './user.dto';

export class OrderDto {
  id: number;
  phone: String;
  totalPrice: number;
  totalQuantity: number;
  createdDate: Date;
  items: [];
  status: String;
  shipping_code: String;
  address: String;
}
