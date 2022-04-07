import React from "react";
import { GetServerSideProps } from "next";
import {
  Space,
  Group,
  Stack,
  SimpleGrid,
  Divider,
  Skeleton,
  Box,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useModals } from "@mantine/modals";

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
import { useRouter } from "next/router";

const RecipeSuggest = dynamic(
  () => import("@components/recipe/RecipeSuggest"),
  { ssr: false }
);
interface Props {
  recipeId: string;
}

export default function Recipe({ recipeId }: Props) {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const { data: recipeData, isLoading, isError } = useRecipe(recipeId);
  const modals = useModals();

  const links = [
    { title: "Home", href: "/" },
    { title: recipeData?.recipe?.label || "", href: `/r/${recipeId}` },
  ];
  console.log(recipeData?.recipe);
  const favoriteMutate = useAddFavorites();
  const favoriteRemoveMutate = useRemoveFavorites();
  const favorites = React.useMemo(() => {
    if (Boolean(user)) {
      return user?.favorites.map((favorite) => favorite.recipeId);
    }
    return [];
  }, [user]);

  const isFavorite = favorites?.includes(
    getRecipeId(recipeData?.recipe?.uri) || ""
  );

  const onAddFavorite = async () => {
    const data: FavoritCreateInput = {
      calories: Number(recipeData?.recipe?.calories?.toFixed()) ?? 0,
      image: recipeData?.recipe?.images?.REGULAR?.url ?? "",
      ingredientCount: recipeData?.recipe?.ingredientLines?.length ?? 0,
      label: recipeData?.recipe?.label ?? "",
      mealType: recipeData?.recipe?.dishType
        ? recipeData?.recipe?.dishType[0]
        : "",
      recipeId: getRecipeId(recipeData?.recipe?.uri) ?? "",
      source: recipeData?.recipe?.source ?? "",
      url: recipeData?.recipe?.url ?? "",
    };
    try {
      await favoriteMutate.mutateAsync(data);
      favoriteMutate.isSuccess &&
        showNotification({
          title: "YEEY! 💖",
          message: `${recipeData?.recipe?.label} is now added to your favorites`,
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
      await favoriteRemoveMutate.mutate(getRecipeId(recipeData?.recipe?.uri));
      favoriteRemoveMutate.isSuccess &&
        showNotification({
          title: "Awh! 💔",
          message: `${recipeData?.recipe?.label} is now removed to your favorites`,
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

  if (isError) {
    router.push("/_error");
  }

  return (
    <>
      <MainBreadcrumbs links={links} />
      <Space h='xl' />
      <RecipeHeader
        isFavorite={isFavorite}
        onHandleFavoriteAction={onHandleFavoriteAction}
        recipe={recipeData?.recipe}
        user={user}
        isLoading={favoriteMutateLoading}
      />
      <Space h='xl' />
      <Group align='start'>
        <RecipeImage
          images={recipeData?.recipe?.images}
          label={recipeData?.recipe?.label}
          source={recipeData?.recipe?.source}
          url={recipeData?.recipe?.url}
        />
        <Stack mx='auto'>
          <RecipeStats
            ingredientLines={recipeData?.recipe?.ingredientLines}
            calories={recipeData?.recipe?.calories}
            totalTime={recipeData?.recipe?.totalTime}
            totalWeight={recipeData?.recipe?.totalWeight}
          />
          <RecipeDescriptionTypes
            cuisineType={recipeData?.recipe?.cuisineType}
            dishType={recipeData?.recipe?.dishType}
            healthLabels={recipeData?.recipe?.healthLabels}
          />
        </Stack>
      </Group>
      <Divider my='xl' />
      <SimpleGrid
        breakpoints={[{ maxWidth: "md", cols: 1, spacing: "xl" }]}
        cols={2}
      >
        <RecipeIngredients
          ingredientLines={recipeData?.recipe?.ingredientLines}
        />
        <RecipeNutritionFacts digest={recipeData?.recipe?.digest} />
      </SimpleGrid>
      <RecipeSuggest label={recipeData?.recipe?.label} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;

  // const fieldDisplay = [...fields, "field=digest"];

  // try {
  //   const response = await api.get(`/v2/${id}?${fieldDisplay.join("&")}`);
  //   const recipeResult = await response.data;
  //   return {
  //     props: {
  //       recipeId: id,
  //       recipe: recipeResult.recipe,
  //     },
  //   };
  // } catch (error: any) {
  //   return {
  //     redirect: {
  //       destination: "/_error",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      recipeId: id,
    },
  };
};

function SkeletonCard() {
  return (
    <>
      <Skeleton height={20} width='30%' mb='xl' />
      <Skeleton visible={true}>
        <Group>
          <Box sx={{ height: 500, width: 350 }}></Box>
        </Group>
      </Skeleton>
      <Skeleton height={100} mt='xl' />
    </>
  );
}
