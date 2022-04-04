import { Container } from "@mantine/core";
import React from "react";
import { MainNavbar } from "./MainNavbar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <MainNavbar />
      <Container py='lg' size={1300}>
        {children}
      </Container>
    </>
  );
};
