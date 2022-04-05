import { Paper, SimpleGrid, Skeleton } from "@mantine/core";
import React from "react";

interface Props {
  numOfCards?: number;
}

export const SkeletonCard = ({ numOfCards = 8 }: Props) => {
  return (
    <SimpleGrid
      spacing='xl'
      my='xl'
      cols={4}
      breakpoints={[
        { maxWidth: "lg", cols: 3, spacing: "md" },
        { maxWidth: "md", cols: 2, spacing: "md" },
        { maxWidth: "xs", cols: 1, spacing: "sm" },
      ]}
    >
      {new Array(numOfCards).fill(1).map((_, idx) => (
        <Skeleton key={idx} visible={true}>
          <Paper sx={{ height: 400, width: 300 }}></Paper>
        </Skeleton>
      ))}
    </SimpleGrid>
  );
};
