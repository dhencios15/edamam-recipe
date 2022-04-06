import { Favorite, User } from "@prisma/client";
import { apiPrisma } from "@utils/auth";
import { useQuery } from "react-query";

type UserWithFavorite = User & { favorites: Favorite[] };

export const useGetMe = () =>
  useQuery(
    ["me"],
    () => apiPrisma.get<UserWithFavorite>("/me").then((res) => res.data),
    {
      staleTime: 0,
    }
  );
