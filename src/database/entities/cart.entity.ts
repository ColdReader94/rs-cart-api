import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CartItem } from '../entities/cartItem.entity';

export enum CART_STATUSES {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity('carts')
export class Cart {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
      type: 'enum',
      enum: CART_STATUSES,
      default: CART_STATUSES.OPEN,
  })
  status: CART_STATUSES;

  @OneToMany(
    () => CartItem,
    cartItem => cartItem.cart,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  items: CartItem[];
}