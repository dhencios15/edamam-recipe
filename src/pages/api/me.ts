import { NextApiRequest, NextApiResponse } from "next";

import { validateRoute } from "@utils/auth";
import { User } from "@prisma/client";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    // const playlistsCount = await prisma.user.count({
    //   where: {
    //     userId: user.id,
    //   },
    // })

    res.json({ ...user });
  }
);
