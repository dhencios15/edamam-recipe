import React from "react";
import type { NextPage } from "next";
import { SearchRecipe } from "@components/home/SearchRecipe";
import { Paper, SimpleGrid, Space } from "@mantine/core";
import { RecipeCard } from "@components/home/RecipeCard";
import api from "@utils/api";
import { FetchReturn } from "@utils/types";

const dummyData = {
  image:
    "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  title: "Verudela Beach",
  country: "Croatia",
  description:
    "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
  badges: [
    {
      emoji: "☀️",
      label: "Sunny weather",
    },
    {
      emoji: "🦓",
      label: "Onsite zoo",
    },
    {
      emoji: "🌊",
      label: "Sea",
    },
    {
      emoji: "🌲",
      label: "Nature",
    },
    {
      emoji: "🤽",
      label: "Water sports",
    },
  ],
};

const Home: NextPage = () => {
  const fetchRecipies = async () => {
    try {
      const response = await api.get<FetchReturn>("", {
        params: {
          q: "chicken",
        },
      });
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    fetchRecipies();
  }, []);
  return (
    <>
      <SearchRecipe />
      <Space h='xl' />
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "lg", cols: 3, spacing: "md" },
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        <RecipeCard
          badges={dummyData.badges}
          country={dummyData.country}
          description={dummyData.description}
          image={dummyData.image}
          title={dummyData.title}
        />
        <RecipeCard
          badges={dummyData.badges}
          country={dummyData.country}
          description={dummyData.description}
          image={dummyData.image}
          title={dummyData.title}
        />
        <RecipeCard
          badges={dummyData.badges}
          country={dummyData.country}
          description={dummyData.description}
          image={dummyData.image}
          title={dummyData.title}
        />
        <RecipeCard
          badges={dummyData.badges}
          country={dummyData.country}
          description={dummyData.description}
          image={dummyData.image}
          title={dummyData.title}
        />
        <RecipeCard
          badges={dummyData.badges}
          country={dummyData.country}
          description={dummyData.description}
          image={dummyData.image}
          title={dummyData.title}
        />
      </SimpleGrid>
    </>
  );
};

export default Home;
