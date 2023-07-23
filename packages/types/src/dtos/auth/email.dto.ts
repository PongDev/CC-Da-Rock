import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class resendEmailDto {
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
