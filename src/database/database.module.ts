
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { Order } from './entities/order.entity';
import { typeORMconfig } from '../ormconfig';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMconfig.options),
    TypeOrmModule.forFeature([Cart, CartItem, Order])
  ],
  exports: [],
})
export class DatabaseModule {}