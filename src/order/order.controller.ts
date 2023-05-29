import { Controller, Get, Delete, Put, Body, HttpStatus, Param } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';

import { OrderService } from './services';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDescriptions } from '../constants';
import { OrderUpdate } from '../dto/order.dto';

@ApiTags('orders')
@Controller('api/profile/orders')
export class OrderController {
  constructor(
    private orderService: OrderService
  ) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescriptions.Get})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: ResponseDescriptions.BadRequest })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: ResponseDescriptions.NotFound })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: ResponseDescriptions.ServerError })
  @Get()
  public async findOrderById(@Param('orderId') id: string) {
    const order = await this.orderService.findById(id);

    return order 
      ? {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: order,
      }
      : null;
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescriptions.Saved })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: ResponseDescriptions.BadRequest })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: ResponseDescriptions.NotFound })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: ResponseDescriptions.ServerError })
  @ApiProperty(new OrderUpdate() as any)
  @Put()
  public async updateOrder(@Param('orderId') id: string, @Body() body: OrderUpdate) {
    const order = await this.orderService.findById(id);
    const orderToUpdate = {
      ...order,
      ...body,
      id: order.id,
    }
    await this.orderService.update(id, orderToUpdate)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: orderToUpdate,
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescriptions.Deleted})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: ResponseDescriptions.BadRequest })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: ResponseDescriptions.NotFound })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: ResponseDescriptions.ServerError })
  @Delete()
  public async deleteOrder(@Param('orderId') id: string) {
    await this.orderService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }
}
