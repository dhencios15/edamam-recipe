import { Favorite, User } from "@prisma/client";
import { apiPrisma } from "@utils/auth";
import { useQuery } from "react-query";

type UserWithFavorite = User & { favorites: Favorite[] };

export const useGetMe = () =>
  useQuery<UserWithFavorite, Error>(
    ["me"],
    () => apiPrisma.get("/me").then((res) => res.data),
    {
      staleTime: 0,
    }
  );
