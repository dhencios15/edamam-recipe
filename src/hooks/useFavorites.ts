import { useMutation, useQueryClient } from "react-query";
import { apiPrisma } from "@utils/auth";
import { FavoritCreateInput } from "@utils/types";

export const useAddFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: FavoritCreateInput) => apiPrisma.post("/favorite", data),
    {
      onSuccess: () => queryClient.invalidateQueries(["me"]),
    }
  );
};

export const useRemoveFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (recipeId: string) => apiPrisma.delete(`/favorite/${recipeId}`),
    {
      onSuccess: () => queryClient.invalidateQueries(["me"]),
    }
  );
};
