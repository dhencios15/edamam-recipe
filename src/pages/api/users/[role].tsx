import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@utils/prisma";
import { User } from "@prisma/client";
import { validateRoute } from "../me";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    if (req.method === "GET") {
      const role = req.query.role;
      try {
        const users = await prisma.user.findMany({
          where: {
            role: String(role),
            NOT: {
              id: user.id,
            },
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        });

        if (!users) {
          return res
            .status(401)
            .json({ status: "fail", message: "No Users found" });
        }

        return res.status(200).send(users);
      } catch (error) {
        return res
          .status(401)
          .json({ status: "fail", message: "No Users found" });
      }
    }
  }
);
