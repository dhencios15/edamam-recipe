import React from "react";
import { useQueryClient } from "react-query";
import { Box, Container } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { clearUser, setUser } from "@redux-store/authSlice";
import { useAppDispatch } from "@redux-store/hooks";
import { apiPrisma } from "@utils/auth";
import { useGetMe } from "@hooks/auth/useAuth";

import { MainFooter } from "./MainFooter";
import { MainNavbar } from "./MainNavbar";

export const Layout: React.FC = ({ children }) => {
  const meQuery = useGetMe();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (meQuery.data) {
      dispatch(setUser(meQuery.data));
    }
  }, [dispatch, meQuery.data]);

  React.useEffect(() => {
    async function logoutError() {
      try {
        await apiPrisma.get("/signout");
        queryClient.invalidateQueries(["me"], { exact: true });
        dispatch(clearUser());
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

  return (
    <Box
      sx={(th) => ({
        backgroundColor: th.colors["deep-white"][1],
        minHeight: "100vh",
      })}
    >
      <MainNavbar />
      <Container py='lg' size={1300}>
        {children}
      </Container>
      <MainFooter />
    </Box>
  );
};
