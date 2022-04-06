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
  Skeleton,
} from "@mantine/core";
import { Logout, Settings, ChevronDown } from "tabler-icons-react";
import Link from "next/link";
import { useGetMe } from "@hooks/auth/useAuth";
import axios from "axios";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { isEmpty } from "lodash";
import { showNotification } from "@mantine/notifications";

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
  const meQuery = useGetMe();
  const router = useRouter();

  const location = router.pathname === "/" ? "/" : router.asPath;

  const logout = async () => {
    try {
      await axios.get("/api/signout");
      queryClient.removeQueries(["me"], { exact: true });

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

  React.useEffect(() => {
    async function logoutError() {
      try {
        await axios.get("/api/signout");
        queryClient.invalidateQueries(["me"], { exact: true });
      } catch (error: any) {
        console.log("error", error.response);
      }
    }
    if (meQuery.isError) {
      logoutError();

      meQuery.error.message.split("code ")[1] === "401" &&
        showNotification({
          title: "Oh Noh! ⚠",
          message: `Your Session Expired, Please login again`,
          color: "red",
        });
    }

    queryClient.removeQueries(["me"], { exact: true });
    // eslint-disable-next-line
  }, [meQuery.isError]);

  const renderAuthMenu =
    !isEmpty(meQuery.data) && !meQuery.isError ? (
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
                {meQuery.data?.name}
              </Text>
              <ChevronDown size={12} />
            </Group>
          </UnstyledButton>
        }
      >
        <Menu.Item icon={<Settings size={14} />}>Account</Menu.Item>
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
