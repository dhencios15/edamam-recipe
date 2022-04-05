import bcrypt from "bcrypt";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prisma";
import { COOKIE_OPTION, jwtSign, JWT_EDA_ACCESS_TOKEN } from "@utils/jwt";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = bcrypt.genSaltSync();
  const { email, password, name } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        name,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (error: any) {
    console.log("api/signup - [ERROR]", error);
    return res
      .status(401)
      .json({ status: "fail", message: "Email is not available" });
  }

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
}
