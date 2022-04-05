import { JWT_EDA_ACCESS_TOKEN } from "@utils/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(JWT_EDA_ACCESS_TOKEN, "", { maxAge: -1, path: "/" })
  );

  res.writeHead(302, { Location: "/auth" });
  res.end();
}
