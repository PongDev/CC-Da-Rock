import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";

export class SolarGenerateRequestDTO {
  @ApiProperty({
    type: () => String,
    required: true,
    description: "Carbon Credit Serial Number",
  })
  @IsString()
  @IsNotEmpty()
  ccSerial: string;
}

export class SolarGenerateResponseDTO {
  @ApiProperty({
    type: () => [String],
    required: true,
    description: "Generated Solar Serials Number",
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  solarSerials: string[];
}
