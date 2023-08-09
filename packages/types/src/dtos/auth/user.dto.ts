import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { RoleType, SMEsSize, SMEsType } from "database";
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsNumber,
  IsString,
} from "class-validator";

export class User {
  @ApiProperty({
    type: () => Number,
    required: true,
    description: "User ID",
    example: "1",
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

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
    type: () => String,
    required: true,
    description: "User's password",
    example: "#diwf84odfhFS",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's name",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's telephone number",
    example: "0957777777",
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("TH")
  phone: string;

  @ApiProperty({
    required: true,
    description: "User's role",
    enum: RoleType,
  })
  @IsString()
  role: RoleType;
}

export class AdditionalSMEsInfo {
  // @ApiProperty({
  //   type: () => Number,
  //   required: true,
  //   description: "SMEs ID",
  //   example: "1",
  // })
  // @IsNumber()
  // @IsNotEmpty()
  // id: number;

  @ApiProperty({
    required: true,
    description: "SMEs' type",
    enum: SMEsType,
  })
  @IsString()
  industry: SMEsType;

  @ApiProperty({
    required: true,
    description: "SMEs' size",
    enum: SMEsSize,
  })
  @IsString()
  size: SMEsSize;
}

export class SMEsUser extends IntersectionType(User, AdditionalSMEsInfo) {}
