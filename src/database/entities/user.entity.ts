
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Cart } from './cart.entity';

  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    login: string;

    @Column({ type: 'text', nullable: false })
    password: string;

    @Column({ type: 'text', nullable: false })
    email: string;

    @OneToMany(
        () => Cart,
        (cart) => cart,
        { cascade: true, onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cartId: string;
  }
