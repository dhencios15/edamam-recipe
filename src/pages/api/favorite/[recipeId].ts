import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@utils/prisma";
import { User } from "@prisma/client";
import { validateRoute } from "../me";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    if (req.method === "DELETE") {
      await removeFavorites(req, res, user);
    }
  }
);

async function removeFavorites(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  const recipeId = String(req.query.recipeId);

  try {
    const favorites = await prisma.favorite.update({
      where: { recipeId },
      data: {
        User: {
          disconnect: {
            id: user.id,
          },
        },
      },
    });
    return res.status(201).send(favorites);
  } catch (error: any) {
    console.log("api/favorite/recipeId - [ERROR]", error);
    return res
      .status(401)
      .json({ status: "fail", message: "Something went wrong" });
  }
}
