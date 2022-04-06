import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@utils/prisma";
import { validateRoute } from "../me";
import { User } from "@prisma/client";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    if (req.method === "POST") {
      await addFavorites(req, res, user);
    }
  }
);

async function addFavorites(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  try {
    const favorites = await prisma.favorite.upsert({
      where: { recipeId: req.body.recipeId },
      update: {
        User: {
          connect: {
            id: user.id,
          },
        },
      },
      create: {
        recipeId: req.body.recipeId,
        label: req.body.label,
        image: req.body.image,
        url: req.body.url,
        source: req.body.source,
        calories: req.body.calories,
        ingredientCount: req.body.ingredientCount,
        mealType: req.body.mealType,
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return res.status(200).send(favorites);
  } catch (error: any) {
    console.log("api/favorite - [ERROR]", error);
    return res
      .status(401)
      .json({ status: "fail", message: "Something went wrong" });
  }
}
