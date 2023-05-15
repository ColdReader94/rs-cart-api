/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { Cart, CartItem } from '../models';
import { Cart as CartEntity, CART_STATUSES} from '../../database/entities/cart.entity';
import { CartItem as CartItemEntity } from '../../database/entities/cartItem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartsRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemsRepository: Repository<CartItemEntity>,
  ) {}

  public async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({
      where: { user_id: userId },
      relations: ['items'],
    });

    if (!cart) {
      return null;
    }

    return {
      id: cart.id,
      items: cart.items.map(cartItem => ({
        // mocked values (except id and count) because items parameters store in Dynamob db
        product: {
          id: cartItem.productId,
          title: 'test product',
          description: 'test description',
          price: 100,
        },
        count: cartItem.count,
      })),
    };
  }

  public async createByUserId(userId: string) {
    const id = uuidv4();

    const cartData = {
      id: id,
      user_id: '0339f8b7-79d4-4870-bd10-875cc9a9efbe',
    };
    const cart = await this.cartsRepository.insert(cartData);

    return cart 
      ? {
        id: cartData.id,
        items: [],
      } 
      : null;
  }

  public async findOrCreateByUserId(userId: string): Promise<Cart> {
    let userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart;
    }

    userCart = await this.createByUserId(userId);

    return userCart;
  }

  public async updateByUserId(userId: string, items: CartItem[]): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({
      where: { user_id: userId },
      relations: ['items'],
    });
    if (!cart) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    cart.items = items.map(
      item =>
        ({
          cartId: cart.id,
          productId: item.product.id,
          count: item.count,
        } as any),
    );
    cart.status = CART_STATUSES.OPEN;
    const updatedCart = await this.cartsRepository.save(cart);
    cart.items.forEach(async (item) => {
      await this.cartItemsRepository.save(item);
    })

    return updatedCart 
      ? {
        id: cart.id,
        items: cart.items.map(cartItem => ({
          product: {
            id: cartItem.productId,
            // mocked values (except id and count) because items parameters store in Dynamob db
            title: 'test product',
            description: 'test description',
            price: 100,
          },
          count: cartItem.count,
        })),
      }
      : null;
  }

  public async removeByUserId(userId: string): Promise<void> {
    const cart = await this.cartsRepository.findOne({
      where: { user_id: userId },
      relations: ['items'],
    });
    if (!cart) {
      return null;
    }
    await this.cartsRepository.remove(cart);
  }

  public async closeCartByUserId(userId: string): Promise<void> {
    const cart = await this.cartsRepository.findOne({
      where: { user_id: userId },
      relations: ['items'],
    });
    if (!cart) {
      return null;
    }
    cart.status = CART_STATUSES.ORDERED;
    cart.items = [];
    await this.cartsRepository.save(cart);
  }
}
