import bcrypt from "bcrypt";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prisma";
import { COOKIE_OPTION, jwtSign, JWT_EDA_ACCESS_TOKEN } from "@utils/jwt";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwtSign({
      email: user.email,
      id: user.id,
      time: Date.now(),
    });

    if (token) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(JWT_EDA_ACCESS_TOKEN, token, COOKIE_OPTION)
      );

      return res.status(200).json(user);
    }
  } else {
    return res.status(401).json({ message: "Email or Password is incorrect" });
  }
}
