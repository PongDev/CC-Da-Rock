import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmpty, IsEnum, IsInt, IsOptional, Min } from "class-validator";

export class GetTransactionsQueryParams {
  @ApiPropertyOptional({
    type: () => String,
    description: "Sort order",
    example: "createdAt+desc",
    enum: ["createdAt+asc", "createdAt+desc", "amount+asc", "amount+desc"],
  })
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({
    type: () => String,
    description: "Time scope",
    example: "2023-07",
  })
  @IsOptional()
  time?: string;

  @ApiPropertyOptional({
    type: () => Number,
    description: "Page number",
    example: "1",
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @IsInt()
  page?: number;

  @ApiPropertyOptional({
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
