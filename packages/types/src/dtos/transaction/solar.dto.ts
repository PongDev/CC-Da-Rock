import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PurchaseSolarCoinsRequestDTO {
  @ApiProperty({
    type: () => Number,
    required: true,
    description: "Amount in Thai Baht (thb)",
    example: "100.50",
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    type: () => Number,
    required: true,
    description: "Carbon footprint (KgCO2eq)",
    example: "100",
  })
  @IsNumber()
  @IsNotEmpty()
  cf: number;

  @ApiProperty({
    type: () => Number,
    required: true,
    description: "Solar Carbon Coin (coins)",
    example: "100",
  })
  @IsNumber()
  @IsNotEmpty()
  scc: number;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Omise Token for charging.",
    example: "test_123456789",
  })
  @IsString()
  @IsNotEmpty()
  tokenId: string;
}
