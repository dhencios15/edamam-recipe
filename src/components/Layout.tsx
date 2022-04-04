import { Box, Container } from "@mantine/core";
import React from "react";
import { MainNavbar } from "./MainNavbar";

export const Layout: React.FC = ({ children }) => {
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
    </Box>
  );
};
