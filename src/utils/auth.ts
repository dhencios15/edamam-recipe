import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "./jwt";
import { prisma } from "./prisma";

export const apiPrisma = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const validateRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.EDA_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const decoded = validateToken(token);
        user = await prisma.user.findUnique({
          where: { email: decoded?.email },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        return res.status(401).json({ error: "Not Authorizied" });
      }

      return handler(req, res, user);
    }

    return res.status(401).json({ error: "Not Authorizied" });
  };
};
