import { useMutation, useQueryClient } from "react-query";
import { FavoritCreateInput } from "@utils/types";
import axios from "axios";

export const useAddFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: FavoritCreateInput) =>
      axios.post("/api/favorite", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["me"]),
    }
  );
};

export const useRemoveFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (recipeId: string) =>
      axios.delete(`/api/favorite/${recipeId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["me"]),
    }
  );
};
