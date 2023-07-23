import { JwtPayload } from "jsonwebtoken";

export type JWTPayload = JwtPayload & {
  userId: number;
  role: string;
};
