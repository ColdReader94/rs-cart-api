import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDescriptions } from '../constants';
import { Cart } from '../dto/cart.dto';
import { Checkout } from '../dto/checkout.dto';

@ApiTags('carts')
@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescriptions.Get })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: ResponseDescriptions.BadRequest })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: ResponseDescriptions.ServerError })
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(
      getUserIdFromRequest(req),
    );

    if (!cart) {
      return null;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart, total: calculateCartTotal(cart as any) },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescriptions.Saved })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: ResponseDescriptions.BadRequest })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: ResponseDescriptions.ServerError })
  @ApiProperty(new Cart() as any)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body: Cart) {
    const cart = await this.cartService.updateByUserId(
      getUserIdFromRequest(req),
      [...body.items],
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: calculateCartTotal(cart as any),
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  //@UseGuards(BasicAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescriptions.Deleted})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: ResponseDescriptions.BadRequest })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: ResponseDescriptions.NotFound })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: ResponseDescriptions.ServerError })
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    await this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  // @UseGuards(JwtAuthGuard)
  //@UseGuards(BasicAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescriptions.Saved })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: ResponseDescriptions.BadRequest })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: ResponseDescriptions.ServerError })
  @ApiProperty(new Checkout() as any)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body: Checkout) {
    // TODO user ID value is mocked due to uncompleted optional task for users table
    const userId = '0339f8b7-79d4-4870-bd10-875cc9a9efbe';
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    const { id: cartId, items } = cart;
    const total = calculateCartTotal(cart as any);
    const order = await this.orderService.create({
      ...body,
      userId,
      cartId,
      items,
      total,
    });
    await this.cartService.closeCartByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: order,
    };
  }
}
