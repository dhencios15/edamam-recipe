import jwt from "jsonwebtoken";
import cookie from "cookie";

export const JWT_SECRET = "JWT_SECRET_JAMSTACK_EDAMAN";
export const JWT_EXPIRED_IN = "8h";
export const JWT_EDA_ACCESS_TOKEN = "EDA_ACCESS_TOKEN";
export const COOKIE_OPTION: cookie.CookieSerializeOptions | undefined = {
  httpOnly: true,
  maxAge: 8 * 60 * 60,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export const jwtSign = (data: any) => {
  if (data) {
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRED_IN });
    return token;
  }

  return null;
};

export const validateToken = (token: string) => {
  const user = jwt.verify(token, JWT_SECRET);
  return user as jwt.JwtPayload | undefined | null;
};
