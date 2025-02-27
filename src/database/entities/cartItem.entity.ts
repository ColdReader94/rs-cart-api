import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn({
    name: 'cart_id',
    type: 'uuid',
  })
  cartId: string;

  @PrimaryColumn({
    name: 'product_id',
    type: 'uuid',
  })
  productId: string;

  @Column({ type: 'integer' })
  count: number;

  @ManyToOne(
    () => Cart,
    cart => cart.items,
    { orphanedRowAction: 'delete' },
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart;
}