import { NextApiRequest, NextApiResponse } from "next";

import { User } from "@prisma/client";
import { validateToken } from "@utils/jwt";
import { prisma } from "@utils/prisma";

export const validateRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.EDA_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const decoded = validateToken(token);
        user = await prisma.user.findUnique({
          where: { email: decoded?.email },
          select: {
            email: true,
            id: true,
            name: true,
            role: true,
            createdAt: true,
            favorites: true,
          },
        });

        if (!user) {
          return res.status(401).json({ error: "User not found" });
        }
      } catch (error) {
        return res.status(401).json({ error: "Not Authorizied" });
      }

      return handler(req, res, user);
    }

    return res.status(405).json({ error: "No Token" });
  };
};

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    const favorites = await prisma.favorite.findMany({
      where: {
        User: {
          some: {
            id: user.id,
          },
        },
      },
    });
    res.json({ ...user, favorites });
  }
);
