import { Checkbox, CheckboxGroup, Stack, Title } from "@mantine/core";
import { isEmpty } from "lodash";
import React from "react";

interface Props {
  ingredientLines?: string[];
}

export const RecipeIngredients = ({ ingredientLines }: Props) => {
  return (
    <Stack>
      <Title
        order={3}
        align='center'
        sx={(th) => ({ color: th.colors.green[7] })}
      >
        INGREDIENTS
      </Title>
      <CheckboxGroup color='green' pl='xl' orientation='vertical'>
        {!isEmpty(ingredientLines) &&
          ingredientLines?.map((ingredient, idx) => (
            <Checkbox key={idx} value={ingredient} label={ingredient} />
          ))}
      </CheckboxGroup>
    </Stack>
  );
};
