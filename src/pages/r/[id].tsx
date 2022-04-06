import React from "react";
import { GetServerSideProps } from "next";
import {
  createStyles,
  Space,
  Title,
  Group,
  Stack,
  ActionIcon,
  SimpleGrid,
  Divider,
} from "@mantine/core";

import api from "@utils/api";
import { fields } from "@utils/constant";
import { DigestEnty, Recipe as RecipeType } from "@utils/types";

import { MainBreadcrumbs } from "@components/MainBreadcrumbs";
import { RecipeImage } from "@components/recipe/RecipeImage";
import { RecipeStats } from "@components/recipe/RecipeStats";
import { isEmpty } from "lodash";
import { RecipeDescriptionTypes } from "@components/recipe/RecipeDescriptionTypes";
import { Heart } from "tabler-icons-react";
import { RecipeIngredients } from "@components/recipe/RecipeIngredients";
import { RecipeNutritionFacts } from "@components/recipe/RecipeNutritionFacts";
import dynamic from "next/dynamic";

const RecipeSuggest = dynamic(
  () => import("@components/recipe/RecipeSuggest"),
  { ssr: false }
);
interface Props {
  recipeId: string;
  recipe: RecipeType & { digest: DigestEnty[] };
  error?: string;
}

const useStyles = createStyles((th) => ({
  title: {
    color: th.colors.green[7],
  },
  image: {
    overflow: "hidden",
    maxHeight: 400,
    maxWidth: 500,
    backgroundColor: th.colors.gray[2],
    paddingBottom: th.spacing.sm,
  },
}));

export default function Recipe({ recipeId, recipe, error }: Props) {
  const { classes } = useStyles();
  const {
    label,
    images,
    source,
    url,
    totalTime,
    totalWeight,
    calories,
    ingredientLines,
    digest,
    cuisineType,
    dishType,
    healthLabels,
  } = recipe;
  const links = [
    { title: "Home", href: "/" },
    { title: label || "", href: `/r/${recipeId}` },
  ];

  return (
    <>
      <MainBreadcrumbs links={links} />
      <Space h='xl' />
      <Group align='center' position='center'>
        <Title align='center' className={classes.title}>
          {recipe.label}
        </Title>
        <ActionIcon color='red' variant='hover'>
          <Heart size={30} />
        </ActionIcon>
      </Group>
      <Space h='xl' />
      <Group align='start'>
        <RecipeImage images={images} label={label} source={source} url={url} />
        <Stack mx='auto'>
          <RecipeStats
            ingredientLines={ingredientLines}
            calories={calories}
            totalTime={totalTime}
            totalWeight={totalWeight}
          />
          <RecipeDescriptionTypes
            cuisineType={cuisineType}
            dishType={dishType}
            healthLabels={healthLabels}
          />
        </Stack>
      </Group>
      <Divider my='xl' />
      <SimpleGrid
        breakpoints={[{ maxWidth: "md", cols: 1, spacing: "xl" }]}
        cols={2}
      >
        <RecipeIngredients ingredientLines={ingredientLines} />
        <RecipeNutritionFacts digest={digest} />
      </SimpleGrid>
      <RecipeSuggest label={label} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;

  const fieldDisplay = [...fields, "field=digest"];

  try {
    const response = await api.get(`/v2/${id}?${fieldDisplay.join("&")}`);
    const recipeResult = await response.data;
    return {
      props: {
        recipeId: id,
        recipe: recipeResult.recipe,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: "Recipe not Found",
      },
    };
  }
};
