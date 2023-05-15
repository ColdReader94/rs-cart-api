import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { Order as OrderEntity } from '../../database/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
  ) { }

  public async findById(orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    }) as Order;
    if (!order) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  public async create(data: any): Promise<Order> {
    const id = v4();
    const order = {
      ...data,
      id,
      status: 'IN_PROGRESS',
    };

    const createdOrder = await this.ordersRepository.insert(order)
    return createdOrder ? order : null;
  }

  public async update(orderId, data) {
    const order = await this.findById(orderId);

    if (!order) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedOrder = await this.ordersRepository.save({
      ...order,
      ...data,
    });

    return updatedOrder || null;
  }

  public async delete(orderId) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId},
    });
    if (!order) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return await this.ordersRepository.remove(order);
  }
}
