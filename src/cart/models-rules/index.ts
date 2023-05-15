import { Cart } from "src/database/entities/cart.entity";
import { CartItem } from "src/database/entities/cartItem.entity";

// Price is hardcoded due to no description in task
const PRICE = 100

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart
    ? cart.items.reduce((acc: number, { count }: CartItem) => {
        return (acc += PRICE * count);
      }, 0)
    : 0;
}
