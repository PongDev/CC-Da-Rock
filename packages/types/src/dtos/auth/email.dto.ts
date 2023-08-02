import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class ResendEmailRequestDto {
  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's email",
    example: "example@email.com",
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: () => Number,
    required: true,
    description: "User's id",
    example: "1",
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class VerifyEmailResponseDto {
  @ApiProperty({
    type: () => Boolean,
    description: "Return true if success.",
  })
  success: boolean;

  @ApiProperty({
    type: () => String,
    description: "Brief description of the response.",
  })
  message: string;

  @ApiProperty({
    type: () => String,
    description: "Email.",
  })
  email: string;
}

export class ResendEmailResponseDto extends OmitType(VerifyEmailResponseDto, [
  "email",
] as const) {}
