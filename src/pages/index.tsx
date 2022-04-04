import React from "react";
import type { NextPage } from "next";
import { SearchRecipe } from "@components/home/SearchRecipe";

const Home: NextPage = () => {
  return (
    <>
      <SearchRecipe />
    </>
  );
};

export default Home;
