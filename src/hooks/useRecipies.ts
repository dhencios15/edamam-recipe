import { useQuery } from "react-query";
import api from "@utils/api";
import { Recipies } from "@utils/types";

interface Query {
  q: string;
  filters: string | null;
  cont: string | null;
}

const fields = [
  "field=label",
  "field=images",
  "field=source",
  "field=dietLabels",
  "field=url",
  "field=healthLabels",
  "field=ingredientLines",
  "field=ingredients",
  "field=calories",
  "field=totalWeight",
  "field=totalTime",
  "field=cuisineType",
  "field=mealType",
  "field=dishType",
  "field=cautions",
  "field=uri",
];

export const fetchRecipies = async ({ q, filters, cont }: Query) =>
  await api.get<Recipies>(`/v2?${fields.join("&")}&${filters}`, {
    params: {
      q: q ?? "beef",
    },
  });

export const useRecipies = ({ q = "beef", filters = "", cont }: Query) =>
  useQuery(["recipies", `${q}-${filters}`, cont], () =>
    fetchRecipies({ q, filters, cont })
  );
