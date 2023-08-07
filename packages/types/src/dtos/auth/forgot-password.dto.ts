import { ApiProperty, PickType } from "@nestjs/swagger";
import { User } from "./user.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordRequestDTO extends PickType(User, [
  "email",
] as const) {}

export class ResetPasswordRequestDTO extends PickType(User, [
  "email",
] as const) {
  @ApiProperty({
    type: () => String,
    required: true,
    description: "User's new password",
    example: "#diwf84odfhFS",
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "Reset Password Token",
    example:
      "73d6fe65a3e49a9eacb0b5a08547ab3fea8c17834519dedac29eb73da8a7d91fbd23ece1de795ccd08b4851b35df091c28bbb99ea8743df621e40f11aa11bf03",
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
