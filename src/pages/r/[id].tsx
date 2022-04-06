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
import { showNotification } from "@mantine/notifications";
import { isEmpty } from "lodash";
import { Heart } from "tabler-icons-react";
import dynamic from "next/dynamic";
import { useModals } from "@mantine/modals";

import api from "@utils/api";
import { fields } from "@utils/constant";
import {
  DigestEnty,
  FavoritCreateInput,
  Recipe as RecipeType,
} from "@utils/types";
import { useAddFavorites, useRemoveFavorites } from "@hooks/useFavorites";
import { getRecipeId } from "@utils/formatter";
import { useGetMe } from "@hooks/auth/useAuth";

import { MainBreadcrumbs } from "@components/MainBreadcrumbs";
import { RecipeImage } from "@components/recipe/RecipeImage";
import { RecipeStats } from "@components/recipe/RecipeStats";
import { RecipeDescriptionTypes } from "@components/recipe/RecipeDescriptionTypes";
import { RecipeIngredients } from "@components/recipe/RecipeIngredients";
import { RecipeNutritionFacts } from "@components/recipe/RecipeNutritionFacts";

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
  const meQuery = useGetMe();
  const modals = useModals();

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
    uri,
  } = recipe;
  const links = [
    { title: "Home", href: "/" },
    { title: label || "", href: `/r/${recipeId}` },
  ];

  const favoriteMutate = useAddFavorites();
  const favoriteRemoveMutate = useRemoveFavorites();
  const favorites = React.useMemo(() => {
    if (!isEmpty(meQuery.data)) {
      return meQuery.data?.favorites.map((favorite) => favorite.recipeId);
    }
    return [];
  }, [meQuery.data]);

  const isFavorite = favorites?.includes(getRecipeId(uri) || "");

  const onAddFavorite = async () => {
    const data: FavoritCreateInput = {
      calories: Number(calories?.toFixed()) ?? 0,
      image: images?.REGULAR?.url ?? "",
      ingredientCount: ingredientLines?.length ?? 0,
      label: label ?? "",
      mealType: dishType?.pop() ?? "",
      recipeId: getRecipeId(uri) ?? "",
      source: source ?? "",
      url: url ?? "",
    };
    try {
      await favoriteMutate.mutateAsync(data);
      showNotification({
        title: "YEEY! 💖",
        message: `${label} is now added to your favorites`,
        color: "green",
      });
    } catch (error: any) {
      modals.openContextModal("authmodal", {
        title: `Ops ⚠! You need to sign in to access this feature`,
        innerProps: {},
      });
      console.log(error);
    }
  };

  const onRemoveFavorites = async () => {
    try {
      await favoriteRemoveMutate.mutate(getRecipeId(uri));
      showNotification({
        title: "Awh! 💔",
        message: `${label} is now removed to your favorites`,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const onHandleFavoriteAction = () => {
    isFavorite ? onRemoveFavorites() : onAddFavorite();
  };

  return (
    <>
      <MainBreadcrumbs links={links} />
      <Space h='xl' />
      <Group align='center' position='center'>
        <Title align='center' className={classes.title}>
          {recipe.label}
        </Title>
        <ActionIcon
          onClick={onHandleFavoriteAction}
          color='red'
          variant={isFavorite ? "filled" : "hover"}
        >
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
      redirect: {
        destination: "/_error",
        permanent: false,
      },
    };
  }
};
