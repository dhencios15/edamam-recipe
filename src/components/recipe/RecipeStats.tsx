import { SimpleGrid } from "@mantine/core";
import React from "react";
import { Clock, Egg, Flame, ScaleOutline } from "tabler-icons-react";
import { RecipeStatCard } from "./RecipeStatCard";

interface Props {
  totalTime?: number | string;
  totalWeight?: number;
  calories?: number;
  ingredientLines?: string[];
}

export const RecipeStats = ({
  calories,
  totalTime,
  totalWeight,
  ingredientLines,
}: Props) => {
  return (
    <SimpleGrid
      mx='auto'
      cols={4}
      breakpoints={[{ maxWidth: "md", cols: 2, spacing: "md" }]}
    >
      {Boolean(totalTime) && (
        <RecipeStatCard
          icon={<Clock size={40} />}
          statValue={`${totalTime}mins`}
          title='PREP TIME'
        />
      )}
      {totalWeight && (
        <RecipeStatCard
          icon={<ScaleOutline color='blue' size={40} />}
          statValue={`${totalWeight.toFixed()}g`}
          title='TOTAL WEIGHT'
        />
      )}
      {calories && (
        <RecipeStatCard
          icon={<Flame color='red' size={40} />}
          statValue={calories?.toFixed()}
          title='TOTAL CALORIES'
        />
      )}
      {calories && (
        <RecipeStatCard
          icon={<Egg color='yellow' size={40} />}
          statValue={ingredientLines?.length}
          title='TOTAL INGREDIENTS'
        />
      )}
    </SimpleGrid>
  );
};
