import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray, IsInt, Min } from "class-validator";

export class SolarBurnResponseDTO {
  @ApiProperty({
    type: () => [String],
    required: true,
    description: "Burned Carbon Credit Serials Number",
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  ccSerials: string[];
}

export class CountBurnedSolarResponseDTO {
  @ApiProperty({
    type: () => Number,
    required: true,
    description: "Count Burned Solar",
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  burnedSolar: number;
}
