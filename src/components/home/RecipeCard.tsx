import React from "react";
import {
  Card,
  Text,
  Group,
  Badge,
  createStyles,
  Image,
  Box,
  ActionIcon,
  Center,
  Tooltip,
} from "@mantine/core";
import { isEmpty } from "lodash";
import Link from "next/link";
import { Clock, Heart } from "tabler-icons-react";

import type { FavoritCreateInput, Recipe } from "@utils/types";
import { getRecipeId, toSlug } from "@utils/formatter";
import { useGetMe } from "@hooks/auth/useAuth";
import { useAddFavorites, useRemoveFavorites } from "@hooks/useFavorites";
import { showNotification } from "@mantine/notifications";
import { useModals } from "@mantine/modals";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,

    ":last-child": {
      borderBottom: 0,
    },
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  source_link: {
    ":hover": {
      color: theme.colors.gray[9],
      textDecoration: "underline",
    },
  },

  title_link: {
    ":hover": {
      color: theme.colors.green[7],
      textDecoration: "underline",
    },
  },

  image_state: {
    ":hover": {
      opacity: 0.85,
    },
  },
}));

interface BadgeCardProps {
  recipe: Recipe;
  usersFavorites?: string[];
}

export function RecipeCard({ recipe, usersFavorites }: BadgeCardProps) {
  const modals = useModals();

  const { classes } = useStyles();
  const {
    images,
    label,
    source,
    calories,
    ingredientLines,
    mealType,
    totalTime,
    url,
    dishType,
    uri,
  } = recipe;

  const favoriteMutate = useAddFavorites();
  const favoriteRemoveMutate = useRemoveFavorites();

  const isFavorite = usersFavorites?.includes(getRecipeId(uri) || "");

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
      !favoriteMutate.isLoading &&
        favoriteMutate.isSuccess &&
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
      !favoriteRemoveMutate.isLoading &&
        favoriteRemoveMutate.isSuccess &&
        showNotification({
          title: "Awh! 💔",
          message: `${label} is now removed to your favorites`,
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  const onHandleFavoriteAction = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    isFavorite ? onRemoveFavorites() : onAddFavorite();
  };

  const favoriteMutateLoading =
    favoriteMutate.isLoading || favoriteRemoveMutate.isLoading;

  return (
    <Card withBorder radius='md' p='md' className={classes.card}>
      <Card.Section>
        <Box sx={{ position: "relative" }}>
          <Link
            href={`/r/${getRecipeId(uri)}?recipe=${toSlug(label)}`}
            passHref
          >
            <Box component='a'>
              {!isEmpty(images?.REGULAR) && (
                <Image
                  src={images?.REGULAR?.url}
                  alt={`${label}-image`}
                  height={images?.REGULAR.height}
                  classNames={{
                    root: classes.image_state,
                  }}
                />
              )}
            </Box>
          </Link>
          <Tooltip
            sx={{ position: "absolute", left: 10, top: 10 }}
            label={
              isFavorite ? "Remove to my favorite list" : "Add to favorite list"
            }
            withArrow
          >
            <ActionIcon
              loading={favoriteMutateLoading}
              onClick={onHandleFavoriteAction}
              color='red'
              variant={isFavorite ? "filled" : "hover"}
            >
              <Heart size={20} />
            </ActionIcon>
          </Tooltip>
        </Box>
      </Card.Section>

      <Card.Section className={classes.section} mt='md'>
        <Group direction='column'>
          <Group position='apart' sx={{ width: "100%" }}>
            <div>
              <Link
                href={`/r/${getRecipeId(uri)}?recipe=${toSlug(label)}`}
                passHref
              >
                <Text
                  className={classes.title_link}
                  component='a'
                  size='lg'
                  weight={500}
                >
                  {label}
                </Text>
              </Link>
              <Text size='xs' color='dimmed'>
                By{" "}
                <Link href={url ?? "/"} passHref>
                  <Text
                    className={classes.source_link}
                    component='a'
                    target='_blank'
                    size='xs'
                    color='dimmed'
                    transform='capitalize'
                  >
                    {source}
                  </Text>
                </Link>
              </Text>
            </div>
            {Boolean(totalTime) && (
              <Center>
                <Clock size={18} />
                <Text size='xs' ml={5}>
                  {totalTime} mins
                </Text>
              </Center>
            )}
          </Group>
          <Group spacing='xs'>
            {!isEmpty(mealType) &&
              mealType?.map((meal, idx) => (
                <Badge key={idx} color='green' size='sm'>
                  {meal}
                </Badge>
              ))}
          </Group>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position='apart' mt='md'>
          <div>
            <Text size='xs' color='dimmed'>
              <Text component='span' weight={500} size='sm'>
                {calories?.toFixed()}
              </Text>{" "}
              CALORIES
            </Text>
          </div>
          <div>
            <Text size='xs' color='dimmed'>
              <Text component='span' weight={500} size='sm'>
                {ingredientLines?.length}
              </Text>{" "}
              INGREDIENTS
            </Text>
          </div>
        </Group>
      </Card.Section>
    </Card>
  );
}
