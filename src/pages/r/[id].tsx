import React from "react";
import { GetServerSideProps } from "next";
import {
  Space,
  Group,
  Stack,
  SimpleGrid,
  Divider,
  Skeleton,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useModals } from "@mantine/modals";

import api from "@utils/api";
import { fields } from "@utils/constant";
import { FavoritCreateInput } from "@utils/types";
import { useAddFavorites, useRemoveFavorites } from "@hooks/useFavorites";
import { getRecipeId } from "@utils/formatter";
import { useAppSelector } from "@redux-store/hooks";
import { selectUser } from "@redux-store/authSlice";

import { MainBreadcrumbs } from "@components/MainBreadcrumbs";
import { RecipeImage } from "@components/recipe/RecipeImage";
import { RecipeStats } from "@components/recipe/RecipeStats";
import { RecipeDescriptionTypes } from "@components/recipe/RecipeDescriptionTypes";
import { RecipeIngredients } from "@components/recipe/RecipeIngredients";
import { RecipeNutritionFacts } from "@components/recipe/RecipeNutritionFacts";
import { RecipeHeader } from "@components/recipe/RecipeHeader";
import { useRecipe } from "@hooks/useRecipies";

const RecipeSuggest = dynamic(
  () => import("@components/recipe/RecipeSuggest"),
  { ssr: false }
);
interface Props {
  recipeId: string;
}

export default function Recipe({ recipeId }: Props) {
  const user = useAppSelector(selectUser);
  const { data: recipeData, isLoading } = useRecipe(recipeId);
  const modals = useModals();

  const links = [
    { title: "Home", href: "/" },
    { title: recipeData?.label || "", href: `/r/${recipeId}` },
  ];

  const favoriteMutate = useAddFavorites();
  const favoriteRemoveMutate = useRemoveFavorites();
  const favorites = React.useMemo(() => {
    if (Boolean(user)) {
      return user?.favorites.map((favorite) => favorite.recipeId);
    }
    return [];
  }, [user]);

  const isFavorite = favorites?.includes(getRecipeId(recipeData?.uri) || "");

  const onAddFavorite = async () => {
    const data: FavoritCreateInput = {
      calories: Number(recipeData?.calories?.toFixed()) ?? 0,
      image: recipeData?.images?.REGULAR?.url ?? "",
      ingredientCount: recipeData?.ingredientLines?.length ?? 0,
      label: recipeData?.label ?? "",
      mealType: recipeData?.dishType ? recipeData?.dishType[0] : "",
      recipeId: getRecipeId(recipeData?.uri) ?? "",
      source: recipeData?.source ?? "",
      url: recipeData?.url ?? "",
    };
    try {
      await favoriteMutate.mutateAsync(data);
      favoriteMutate.isSuccess &&
        showNotification({
          title: "YEEY! 💖",
          message: `${recipeData?.label} is now added to your favorites`,
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
      await favoriteRemoveMutate.mutate(getRecipeId(recipeData?.uri));
      favoriteRemoveMutate.isSuccess &&
        showNotification({
          title: "Awh! 💔",
          message: `${recipeData?.label} is now removed to your favorites`,
          color: "red",
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  const onHandleFavoriteAction = () => {
    isFavorite ? onRemoveFavorites() : onAddFavorite();
  };

  const favoriteMutateLoading =
    favoriteMutate.isLoading || favoriteRemoveMutate.isLoading;

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <>
      <MainBreadcrumbs links={links} />
      <Space h='xl' />
      <RecipeHeader
        isFavorite={isFavorite}
        onHandleFavoriteAction={onHandleFavoriteAction}
        recipe={recipeData}
        user={user}
        isLoading={favoriteMutateLoading}
      />
      <Space h='xl' />
      <Group align='start'>
        <RecipeImage
          images={recipeData?.images}
          label={recipeData?.label}
          source={recipeData?.source}
          url={recipeData?.url}
        />
        <Stack mx='auto'>
          <RecipeStats
            ingredientLines={recipeData?.ingredientLines}
            calories={recipeData?.calories}
            totalTime={recipeData?.totalTime}
            totalWeight={recipeData?.totalWeight}
          />
          <RecipeDescriptionTypes
            cuisineType={recipeData?.cuisineType}
            dishType={recipeData?.dishType}
            healthLabels={recipeData?.healthLabels}
          />
        </Stack>
      </Group>
      <Divider my='xl' />
      <SimpleGrid
        breakpoints={[{ maxWidth: "md", cols: 1, spacing: "xl" }]}
        cols={2}
      >
        <RecipeIngredients ingredientLines={recipeData?.ingredientLines} />
        <RecipeNutritionFacts digest={recipeData?.digest} />
      </SimpleGrid>
      <RecipeSuggest label={recipeData?.label} />
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

function SkeletonCard() {
  return (
    <>
      <Skeleton height={100} width={100} mb='xl' />
      <Skeleton height={8} radius='xl' />
      <Skeleton height={8} mt={6} radius='xl' />
      <Skeleton height={8} mt={6} width='70%' radius='xl' />
    </>
  );
}
