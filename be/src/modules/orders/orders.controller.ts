import {
  Controller,
  Post,
  Body,
  HttpException,
  UnauthorizedException,
  UseGuards,
  Req,
  Get,
  Put,
  ParseIntPipe,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { UserEntity } from 'src/core/entity/user.entity';
import { ProductEntity } from 'src/core/entity/product.entity';
import { OrderEntity } from 'src/core/entity/order.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guard';
import { OrderDto } from 'src/core/dto/order.dto';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('/api/v1/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private jwtService: JwtService,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Body() body: OrderDto, @Req() req: Request) {
    const authorizationHeader = req.headers['authorization'];
    const [, token] = authorizationHeader.split(' ');
    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken['sub'];
    body.id = userId;
    body.shipping_code = 'VIETTELPOST_' + new Date().getTime();
    body.status = 'CREATE';
    return await this.orderService.createOrder(body);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Get()
  async getOders() {
    // const authorizationHeader = req.headers['authorization'];
    // const [, token] = authorizationHeader.split(' ');
    // const decodedToken = this.jwtService.decode(token);
    // const userId = decodedToken['sub'];
    // body.id = userId;
    // body.contractId = 'ODER_' + new Date().getTime();
    // body.status = 'CREATE';
    return await this.orderService.getOrders();
  }

  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Get('/:id')
  async getOrderDetails(@Param('id') id: number) {
    // const authorizationHeader = req.headers['authorization'];
    // const [, token] = authorizationHeader.split(' ');
    // const decodedToken = this.jwtService.decode(token);
    // const userId = decodedToken['sub'];
    // body.id = userId;
    // body.contractId = 'ODER_' + new Date().getTime();
    // body.status = 'CREATE';
    console.log(id);
    return await this.orderService.getOrderDetails(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  @Post('/update')
  async getUpdateOderById(
    @Body('orderId', ParseIntPipe) orderId: number,
    @Body('status') status: string,
    @Body('address') address: string,
  ) {
    // const authorizationHeader = req.headers['authorization'];
    // const [, token] = authorizationHeader.split(' ');
    // const decodedToken = this.jwtService.decode(token);
    // const userId = decodedToken['sub'];
    // body.id = userId;
    // body.contractId = 'ODER_' + new Date().getTime();
    // body.status = 'CREATE';

    if (isNaN(orderId)) {
      throw new BadRequestException(
        'Invalid orderId. Numeric string is expected.',
      );
    }

    return await this.orderService.updateStatusOder(orderId, status, address);
  }
}
