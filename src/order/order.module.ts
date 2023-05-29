import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { Order } from '../database/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([Order]) ],
  providers: [ OrderService ],
  controllers: [ OrderController ],
  exports: [ OrderService ]
})
export class OrderModule {}
