import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@utils/types";
import { validateRoute } from "../me";
import { User } from "@prisma/client";
import { prisma } from "@utils/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponseServerIO, user: User) => {
    if (req.method === "POST") {
      const { message, receiverId } = req.body;

      try {
        const newMessage = await prisma.message.create({
          data: {
            senderId: user.id,
            receiverId,
            text: message,
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

        res?.socket?.server?.io?.emit("message", newMessage);

        return res.status(201).json(newMessage);
      } catch (error) {
        return res.status(500).json({ error: "Unable to send message" });
      }
    }

    if (req.method === "GET") {
      try {
        const messages = await prisma.message.findMany({
          where: {
            OR: [
              {
                senderId: user.id,
              },
              {
                receiverId: user.id,
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
