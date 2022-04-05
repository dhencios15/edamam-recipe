import React from "react";
import { Box, Center, Loader, SimpleGrid, Text } from "@mantine/core";

import { useRecipies } from "@hooks/useRecipies";

import { RecipeCard } from "@components/home/RecipeCard";
import { Pagination } from "./Pagination";
import { isEmpty } from "lodash";
import { getRecipeId } from "@utils/formatter";
import { useAppDispatch, useAppSelector } from "@redux-store/hooks";
import {
  selectFilter,
  selectNextPage,
  selectSearch,
  setNextPage,
} from "./home.store/querySlice";
import { useInfiniteQuery } from "react-query";
import type { Recipies as RecipiesType } from "@utils/types";
import api from "@utils/api";
import { SkeletonCard } from "./SkeletonCard";
import { fields } from "@utils/constant";

const baseUrl = `https://api.edamam.com/api/recipes/v2?${fields.join("&")}`;

export const Recipies = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectSearch);
  const filters = useAppSelector(selectFilter);
  const nextUrl = useAppSelector(selectNextPage);

  const fetchUrl = !isEmpty(nextUrl) ? nextUrl : `${baseUrl}&${filters}`;

  const infiniteQuery = useInfiniteQuery(
    ["recipies", `${search}-${filters}`, nextUrl],
    async () =>
      await api.get<RecipiesType>(`${fetchUrl}`, {
        params: {
          q: search ?? "beef",
        },
      }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data._links?.next?.href ?? undefined;
      },
    }
  );

  const lastUrl = infiniteQuery.data?.pageParams.pop() as string;

  const onNextPage = React.useCallback(async () => {
    dispatch(setNextPage(lastUrl));
    await infiniteQuery.fetchNextPage();
    // eslint-disable-next-line
  }, []);

  // React.useEffect(() => {
  //   let fetching = false;
  //   const onScroll = async (event: any) => {
  //     const { scrollHeight, scrollTop, clientHeight } =
  //       event?.target?.scrollingElement;

  //     if (!fetching && scrollHeight - scrollTop <= clientHeight * 2.5) {
  //       fetching = true;
  //       if (infiniteQuery.hasNextPage) {
  //         dispatch(setNextPage(lastUrl));
  //         await infiniteQuery.fetchNextPage();
  //       }
  //       fetching = false;
  //     }
  //   };

  //   document.addEventListener("scroll", onScroll);
  //   return () => {
  //     document.removeEventListener("scroll", onScroll);
  //   };
  //   // eslint-disable-next-line
  // }, []);

  if (infiniteQuery.isLoading) {
    return <SkeletonCard />;
  }

  if (
    infiniteQuery.isError ||
    isEmpty(infiniteQuery.data?.pages[0].data?.hits)
  ) {
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
          hit_recipe.data?.hits?.map(({ recipe }) => (
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
