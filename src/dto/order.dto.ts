import { ApiPropertyOptional } from "@nestjs/swagger";
import { Checkout } from "./checkout.dto";

export class OrderUpdate extends Checkout {
  @ApiPropertyOptional()
  status: string;

  @ApiPropertyOptional()
  total: number;
}
