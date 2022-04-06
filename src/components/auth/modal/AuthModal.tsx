import { Tabs } from "@mantine/core";
import React from "react";
import { Signin } from "../Signin";
import { Signup } from "../Signup";

export const AuthModal = () => {
  return (
    <Tabs grow mb='xl'>
      <Tabs.Tab label='Sign in'>
        <Signin />
      </Tabs.Tab>
      <Tabs.Tab label='Sign up'>
        <Signup />
      </Tabs.Tab>
    </Tabs>
  );
};
