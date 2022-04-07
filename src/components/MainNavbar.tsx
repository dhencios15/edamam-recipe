import React, { useState } from "react";
import {
  createStyles,
  Container,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Paper,
  Title,
  Box,
  Image,
  Avatar,
  Button,
} from "@mantine/core";
import { Logout, Settings, ChevronDown } from "tabler-icons-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { showNotification } from "@mantine/notifications";

import { useAppDispatch, useAppSelector } from "@redux-store/hooks";
import { clearUser, selectUser } from "@redux-store/authSlice";

const useStyles = createStyles((theme) => ({
  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
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
  const queryClient = useQueryClient();
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const location = router.pathname === "/" ? "/" : router.asPath;

  const logout = async () => {
    try {
      await axios.get("/api/signout");
      queryClient.removeQueries(["me"], { exact: true });
      dispatch(clearUser());
      showNotification({
        title: "BYE BYE 👋",
        message: `Thanks for the visit`,
        color: "green",
        autoClose: 1000,
      });
    } catch (error) {
      showNotification({
        title: "Oh Noh! ⚠",
        message: `Something went wrong`,
        color: "red",
      });
    } finally {
      router.push(location);
      queryClient.invalidateQueries(["me"], { exact: true });
    }
  };

  const renderAuthMenu = React.useMemo(() => {
    return Boolean(user) ? (
      <Menu
        size={180}
        placement='end'
        transition='pop-top-right'
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        control={
          <UnstyledButton
            className={cx(classes.user, {
              [classes.userActive]: userMenuOpened,
            })}
          >
            <Group spacing={7}>
              <Avatar
                src='https://robohash.org/eda'
                alt='user avatay'
                radius='xl'
                size={20}
              />
              <Text
                transform='capitalize'
                weight={500}
                size='sm'
                sx={{ lineHeight: 1 }}
                mr={3}
              >
                {user?.name}
              </Text>
              <ChevronDown size={12} />
            </Group>
          </UnstyledButton>
        }
      >
        {/* TODO - ACCOUNT PAGE */}
        {/* <Menu.Item icon={<Settings size={14} />}>Account</Menu.Item> */}
        <Menu.Item onClick={logout} icon={<Logout size={14} />}>
          Logout
        </Menu.Item>
      </Menu>
    ) : (
      <Link href='/auth' passHref>
        <Button component='a' color='green'>
          Login
        </Button>
      </Link>
    );
    // eslint-disable-next-line
  }, [user]);

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
                  EYA
                </Text>
                RECIPES
              </Title>
            </Box>
          </Link>

          {renderAuthMenu}
        </Group>
      </Container>
    </Paper>
  );
}
