import React from "react";
import { Box, Center, Loader, SimpleGrid, Text } from "@mantine/core";

import { useRecipies } from "@hooks/useRecipies";

import { RecipeCard } from "@components/home/RecipeCard";
import { Pagination } from "./Pagination";
import { isEmpty } from "lodash";
import { getRecipeId } from "@utils/formatter";
import { useAppSelector } from "@redux-store/hooks";
import {
  selectFilter,
  selectNextPage,
  selectSearch,
} from "./home.store/querySlice";

export const Recipies = () => {
  const search = useAppSelector(selectSearch);
  const filters = useAppSelector(selectFilter);
  const cont = useAppSelector(selectNextPage);
  const { data, isLoading, isError } = useRecipies({
    q: search,
    filters,
    cont,
  });

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (isError || isEmpty(data?.data.hits)) {
    return (
      <Center>
        <Text align='center' size='xl' color='red'>
          {isError ? "Something went wrong!" : "No Recipies Found!"}
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
        {!isEmpty(data?.data.hits) &&
          data?.data.hits?.map(({ recipe }) => (
            <RecipeCard key={getRecipeId(recipe.uri)} recipe={recipe} />
          ))}
      </SimpleGrid>
      <Pagination url={data?.data?._links?.next?.href} />
    </>
  );
};
