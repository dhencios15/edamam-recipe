import { Anchor, createStyles, Image, Paper, Text } from "@mantine/core";
import { ImageType } from "@utils/types";
import React from "react";

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

interface Props {
  images?: ImageType;
  label?: string;
  url?: string;
  source?: string;
}

export const RecipeImage = ({ images, label, url, source }: Props) => {
  const { classes } = useStyles();

  return (
    <Paper radius='md' mx='auto' shadow='lg' className={classes.image}>
      <Image
        src={images?.REGULAR?.url}
        alt={`${label}-image`}
        height={images?.REGULAR?.height}
        caption={
          <Text size='xs'>
            See full recipe on:{" "}
            <Anchor underline size='xs' href={url} target='_blank'>
              {source}
            </Anchor>
          </Text>
        }
      />
    </Paper>
  );
};
