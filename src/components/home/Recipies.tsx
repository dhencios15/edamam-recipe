import React from "react";
import { useInfiniteQuery } from "react-query";
import { Center, SimpleGrid, Text } from "@mantine/core";
import { isEmpty } from "lodash";

import { useAppDispatch, useAppSelector } from "@redux-store/hooks";
import {
  selectFilter,
  selectSearch,
  setNextPage,
} from "./home.store/querySlice";
import api from "@utils/api";
import { fields } from "@utils/constant";
import { getRecipeId } from "@utils/formatter";
import type { Recipies as RecipiesType } from "@utils/types";

import { Pagination } from "./Pagination";
import { SkeletonCard } from "./SkeletonCard";
import { RecipeCard } from "@components/home/RecipeCard";

const baseUrl = `https://api.edamam.com/api/recipes/v2?${fields.join("&")}`;

export const Recipies = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectSearch);
  const filters = useAppSelector(selectFilter);

  const infiniteQuery = useInfiniteQuery(
    ["recipies", search, filters],
    async ({ pageParam }) => {
      const fetchUrl = !isEmpty(pageParam)
        ? pageParam
        : `${baseUrl}&${filters}`;
      const res = await api.get<RecipiesType>(`${fetchUrl}`, {
        params: {
          q: search ?? "beef",
        },
      });
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage._links?.next?.href || undefined,
    }
  );

  const lastUrl =
    (infiniteQuery.data?.pageParams.pop() as string) ||
    (infiniteQuery.data?.pages[0]._links?.next?.href as string);

  const onNextPage = async () => {
    dispatch(setNextPage(lastUrl));
    await infiniteQuery.fetchNextPage();
  };

  if (infiniteQuery.isLoading) {
    return <SkeletonCard />;
  }

  if (infiniteQuery.isError || isEmpty(infiniteQuery.data?.pages[0]?.hits)) {
    return (
      <Center>
        <Text align='center' size='xl' color='red'>
          {infiniteQuery.isError
            ? "Something went wrong!"
            : "No Recipies Found!"}
        </Text>
      </Center>
    );
  }

  return (
    <>
      <SimpleGrid
        spacing='xl'
        cols={4}
        breakpoints={[
          { maxWidth: "lg", cols: 3, spacing: "md" },
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        {infiniteQuery.data?.pages.map((hit_recipe) =>
          hit_recipe?.hits?.map(({ recipe }) => (
            <RecipeCard key={getRecipeId(recipe.uri)} recipe={recipe} />
          ))
        )}
      </SimpleGrid>
      {infiniteQuery.isFetching && <SkeletonCard numOfCards={4} />}
      <Pagination
        nextPage={onNextPage}
        isFetching={infiniteQuery.isFetchingNextPage}
        hasNextPage={infiniteQuery.hasNextPage}
      />
    </>
  );
};
