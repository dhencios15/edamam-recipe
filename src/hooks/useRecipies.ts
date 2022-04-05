import { useQuery } from "react-query";
import api from "@utils/api";
import { Recipies } from "@utils/types";

interface Query {
  q: string;
  filters?: string;
}

export const fetchRecipies = async ({ q, filters }: Query) =>
  await api.get<Recipies>(``, { params: { q } });

export const useRecipies = ({ q = "beef", filters }: Query) =>
  useQuery(["recipies", q, filters], () => fetchRecipies({ q, filters }));
