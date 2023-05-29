import { ApiProperty } from "@nestjs/swagger";
import { CartItem as CartEntity } from "../database/entities/cartItem.entity";
import { CartItem } from "../cart/models";

export class Cart {
    @ApiProperty({
        isArray: true,
        type: CartEntity,
    })
    items: CartItem[];
}
