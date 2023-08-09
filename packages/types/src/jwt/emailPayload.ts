import { JwtPayload } from "jsonwebtoken";

export type JWTEmailPayload = JwtPayload & {
  userId: number;
  email: string;
};
