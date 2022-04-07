import { useQuery } from "react-query";
import api from "@utils/api";
import { Recipies, Recipe, DigestEnty } from "@utils/types";

interface Query {
  q: string;
}

type RecipeType = {
  recipe: Recipe & { digest: DigestEnty[] };
};

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

const fieldDisplay = [...fields, "field=digest"];

export const fetchRecipies = async ({ q }: Query) =>
  await api
    .get<Recipies>(`/v2?${fields.join("&")}`, {
      params: {
        q: q ?? "beef",
      },
    })
    .then((res) => res.data);

export const fetchRecipe = async (id: string) =>
  await api.get(`/v2/${id}?${fieldDisplay.join("&")}`).then((res) => res.data);

export const useRecipies = ({ q = "beef" }: Query) =>
  useQuery(["recipies", q], () => fetchRecipies({ q }), {
    enabled: !!q,
  });

export const useRecipe = (id: string) =>
  useQuery<RecipeType, Error>(["recipies", id], () => fetchRecipe(id), {
    enabled: !!id,
  });
