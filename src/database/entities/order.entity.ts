
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem as CartItemEntity } from './cartItem.entity';
import { CartItem } from '../../cart/models';


enum ORDER_STATUSES {
  ORDERED = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

  @Entity('orders')
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id', type: 'uuid', nullable: false })
    userId: string;

    @ManyToOne(() => Cart)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cartId: string;

    @Column({ type: 'simple-json', nullable: true })
    payment: Record<string, unknown>;

    @Column({ type: 'simple-json', nullable: true })
    delivery: Record<string, unknown>;

    @Column({ type: 'text', nullable: true })
    comments: string;

    @Column({
        type: 'enum',
        enum: ORDER_STATUSES,
        default: ORDER_STATUSES.ORDERED,
    })
    status: ORDER_STATUSES;

    @Column({ type: 'integer', nullable: false })
    total: number;
  }
