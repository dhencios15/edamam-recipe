import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@utils/types";
import { validateRoute } from "../me";
import { User } from "@prisma/client";
import { prisma } from "@utils/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponseServerIO, user: User) => {
    if (req.method === "GET") {
      const receiverId = req.query.receiverId;
      try {
        const messages = await prisma.message.findMany({
          where: {
            AND: [
              {
                senderId: { in: [user.id, +receiverId] },
              },
              {
                receiverId: { in: [user.id, +receiverId] },
              },
            ],
          },
          include: {
            to: {
              select: {
                name: true,
                id: true,
              },
            },
            from: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        });
        return res.status(200).json(messages);
      } catch (error) {
        return res.status(500).json({ error: "Unable fetch messages" });
      }
    }
  }
);
