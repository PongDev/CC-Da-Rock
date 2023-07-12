import { IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { User } from "./user.dto";

// export class LogInRequest extends PickType(User, [
//   "email",
//   "password",
// ] as const) {}

export class LoginRequest extends IntersectionType(
  PartialType(PickType(User, ["email", "name"] as const)),
  PickType(User, ["password"] as const)
) {}
