import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";

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
