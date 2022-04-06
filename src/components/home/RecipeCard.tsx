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
} from "@mantine/core";
import { isEmpty } from "lodash";
import Link from "next/link";
import { Clock, Heart } from "tabler-icons-react";

import type { Recipe } from "@utils/types";
import { getRecipeId, toSlug } from "@utils/formatter";

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
}

export function RecipeCard({ recipe }: BadgeCardProps) {
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
    uri,
  } = recipe;

  return (
    <Card withBorder radius='md' p='md' className={classes.card}>
      <Card.Section>
        <Link href={`/r/${getRecipeId(uri)}?recipe=${toSlug(label)}`} passHref>
          <Box component='a' sx={{ position: "relative" }}>
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
            <ActionIcon
              sx={{ position: "absolute", left: 10, top: 10 }}
              color='red'
              variant='light'
            >
              <Heart size={20} />
            </ActionIcon>
          </Box>
        </Link>
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
