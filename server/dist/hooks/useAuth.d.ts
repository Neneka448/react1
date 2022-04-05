import { ResponseBody } from "../types/network";
import JWT from "jsonwebtoken";
export default function (ctx: any): [boolean, ResponseBody | JWT.JwtPayload | null];
