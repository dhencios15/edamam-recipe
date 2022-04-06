import React from "react";
import { createStyles, Anchor, Group, Container } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 50,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

const footerData = [
  {
    link: "https://github.com/dhencios15",
    label: "Made by Dhencioo ♥",
  },
  {
    link: "https://www.edamam.com/",
    label: "Credits to Edaman",
  },
];

export function MainFooter() {
  const { classes } = useStyles();
  const items = footerData.map((data) => (
    <Anchor<"a">
      color='dimmed'
      key={data.label}
      href={data.link}
      target='_blank'
      sx={{ lineHeight: 1 }}
      size='sm'
    >
      {data.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container size={1300} py='xl'>
        <Group position='center' className={classes.links}>
          {items}
        </Group>
      </Container>
    </div>
  );
}
