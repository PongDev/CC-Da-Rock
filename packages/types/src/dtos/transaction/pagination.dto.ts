import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmpty, IsEnum, IsInt, IsOptional, Min } from "class-validator";

export class GetTransactionsQueryParams {
  @ApiProperty({
    type: () => String,
    description: "Sort order",
    example: "createdAt+desc",
    enum: ["createdAt+asc", "createdAt+desc", "amount+asc", "amount+desc"],
  })
  @IsOptional()
  sortBy?: string;

  @ApiProperty({
    type: () => String,
    description: "Time scope",
    example: "2023-07",
  })
  @IsOptional()
  time?: string;

  @ApiProperty({
    type: () => Number,
    description: "Page number",
    example: "10",
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @IsInt()
  page?: number;

  @ApiProperty({
    type: () => Number,
    description: "Data per page",
    example: "10",
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @IsInt()
  limit?: number;
}
