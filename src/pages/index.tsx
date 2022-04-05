import React from "react";
import type { NextPage } from "next";
import { Space } from "@mantine/core";

import { SearchRecipe } from "@components/home/SearchRecipe";
import { Recipies } from "@components/home/Recipies";

const Home: NextPage = () => (
  <>
    <SearchRecipe />
    <Space h='xl' />
    <Recipies />
  </>
);

export default Home;
