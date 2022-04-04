import React, { useState } from "react";
import {
  createStyles,
  Container,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Button,
  Paper,
  Title,
  Box,
  Image,
} from "@mantine/core";
import { Logout, Settings, ChevronDown, Egg } from "tabler-icons-react";
import { NextLink } from "@mantine/next";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.colors.green[4],
    },
  },

  userActive: {
    backgroundColor: theme.colors.green[4],
  },

  accountBtn: {
    backgroundColor: theme.colors.green[7],

    ":hover": {
      backgroundColor: theme.colors.green[4],
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: 6,

    ":hover": {
      cursor: "pointer",
    },
  },
}));

export function MainNavbar() {
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Paper shadow='md' pt='sm'>
      <Container size={1300} className={classes.mainSection}>
        <Group py='sm' position='apart'>
          <Link href='/' passHref>
            <Box className={classes.logo}>
              <Image radius='md' src='/edamam.png' alt='Edamam logo' />
              <Title sx={(th) => ({ color: "#6acc00" })} order={4}>
                <Text
                  size='lg'
                  component='span'
                  sx={(th) => ({
                    color: th.colors.green[7],
                    fontStyle: "italic",
                  })}
                >
                  EDA
                </Text>
                RECIPE
              </Title>
            </Box>
          </Link>

          <Menu
            size={180}
            placement='end'
            transition='pop-top-right'
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            control={
              <UnstyledButton
                className={cx(classes.user, classes.accountBtn, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
                    ACCOUNT
                  </Text>
                  <ChevronDown size={12} />
                </Group>
              </UnstyledButton>
            }
          >
            <Menu.Item icon={<Settings size={14} />}>Account</Menu.Item>
            <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>
          </Menu>
        </Group>
      </Container>
    </Paper>
  );
}
