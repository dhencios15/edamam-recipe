import React from "react";
import { Space } from "@mantine/core";

import { SearchRecipe } from "@components/home/SearchRecipe";
import { Recipies } from "@components/home/Recipies";

export default function Home() {
  return (
    <>
      <SearchRecipe />
      <Space h='xl' />
      <Recipies />
    </>
  );
}
