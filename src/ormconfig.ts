import { Cart } from "./database/entities/cart.entity";
import { Order } from "./database/entities/order.entity";
import { CartItem } from "./database/entities/cartItem.entity";
import { DataSource } from 'typeorm';
import { User } from "./database/entities/user.entity";

export const typeORMconfig = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Cart, CartItem, Order],
    logging: true,
});
