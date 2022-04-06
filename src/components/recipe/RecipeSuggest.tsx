import React from "react";
import { isEmpty } from "lodash";
import { Box, SimpleGrid, Space, Title } from "@mantine/core";

import { getRecipeId } from "@utils/formatter";
import { useAppSelector } from "@redux-store/hooks";

import { selectSearch } from "@components/home/home.store/querySlice";
import { RecipeCard } from "@components/home/RecipeCard";
import { SkeletonCard } from "@components/home/SkeletonCard";
import { useRecipies } from "@hooks/useRecipies";

interface Props {
  label?: string;
}

const getRandomInt = (max: number = 10) => Math.floor(Math.random() * max);

export default function RecipeSuggest({ label }: Props) {
  const search = useAppSelector(selectSearch);
  const recipiesQuery = useRecipies({ q: search });
  const randomNumber = getRandomInt();

  const recepiesData = React.useMemo(() => {
    if (recipiesQuery.data?.hits) {
      return recipiesQuery.data.hits
        .slice(randomNumber, randomNumber + 4)
        .filter(({ recipe }) => recipe.label !== label);
    }

    return [];
  }, [label, randomNumber, recipiesQuery?.data?.hits]);

  if (recipiesQuery.isLoading) {
    return <SkeletonCard numOfCards={4} />;
  }

  return (
    <Box mt='xl'>
      {!isEmpty(recipiesQuery.data?.hits) && (
        <>
          <Title order={4}>YOU MIGHT ALSO LIKE</Title>
          <Space h='xl' />
          <SimpleGrid
            spacing='xl'
            cols={4}
            breakpoints={[
              { maxWidth: "lg", cols: 3, spacing: "md" },
              { maxWidth: "md", cols: 2, spacing: "md" },
              { maxWidth: "xs", cols: 1, spacing: "sm" },
            ]}
          >
            {recepiesData.map(({ recipe }) => (
              <RecipeCard key={getRecipeId(recipe.uri)} recipe={recipe} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}
