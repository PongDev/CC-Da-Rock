import { OmitType, PickType, IntersectionType } from "@nestjs/swagger";
import { SMEsUser, User } from "./user.dto";

export class RegisterUserRetailRequest extends OmitType(User, [
  "id",
  "role",
] as const) {}

export class RegisterUserSMEsRequest extends OmitType(SMEsUser, [
  "id",
  "role",
] as const) {}

export class RegisterUserResponse extends OmitType(User, [
  "password",
] as const) {}
