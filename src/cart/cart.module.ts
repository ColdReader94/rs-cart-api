import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { Cart } from '../database/entities/cart.entity';
import { CartItem } from '../database/entities/cartItem.entity';


@Module({
  imports: [ OrderModule, TypeOrmModule.forFeature([Cart, CartItem]) ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
