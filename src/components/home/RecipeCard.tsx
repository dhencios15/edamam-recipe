import React from "react";
import { Heart } from "tabler-icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";

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
}));

interface BadgeCardProps {
  image: string;
  title: string;
  country: string;
  description: string;
  badges: {
    emoji: string;
    label: string;
  }[];
}

export function RecipeCard({
  image,
  title,
  description,
  country,
  badges,
}: BadgeCardProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Card withBorder radius='md' p='md' className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt='md'>
        <Group position='apart'>
          <div>
            <Link href='/' passHref>
              <Text
                className={classes.title_link}
                component='a'
                size='lg'
                weight={500}
              >
                {title}
              </Text>
            </Link>
            <Text size='xs' color='dimmed'>
              By{" "}
              <Link href='/' passHref>
                <Text
                  className={classes.source_link}
                  component='a'
                  target='_blank'
                  size='xs'
                  color='dimmed'
                >
                  BBC Good Food
                </Text>
              </Link>
            </Text>
          </div>
          <Badge color='green' size='sm'>
            lunch/dinner
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position='apart' mt='md'>
          <div>
            <Text size='xs' color='dimmed'>
              <Text component='span' weight={500} size='sm'>
                22
              </Text>{" "}
              CALORIES
            </Text>
          </div>
          <div>
            <Text size='xs' color='dimmed'>
              <Text component='span' weight={500} size='sm'>
                3
              </Text>{" "}
              INGREDIENTS
            </Text>
          </div>
        </Group>
      </Card.Section>
    </Card>
  );
}
