import { Favorite, User } from "@prisma/client";
import { apiPrisma } from "@utils/auth";
import axios from "axios";
import { useQuery } from "react-query";

export type UserWithFavorite = User & { favorites: Favorite[] };

export const useGetMe = () =>
  useQuery<UserWithFavorite, Error>(
    ["me"],
    () =>
      axios
        .get("/api/me", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    {
      staleTime: 0,
    }
  );
