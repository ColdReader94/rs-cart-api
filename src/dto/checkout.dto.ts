import { ApiPropertyOptional } from "@nestjs/swagger";

export class Checkout {  
    @ApiPropertyOptional()
    payment: {
      type: string,
      address?: any,
      creditCard?: any,
    }
  
    @ApiPropertyOptional()
    delivery: {
      type: string,
      address: any,
    }
  
    @ApiPropertyOptional()
    comments: string;
  }