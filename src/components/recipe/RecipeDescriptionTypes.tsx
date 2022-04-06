import {
  Badge,
  Box,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import React from "react";

interface Props {
  cuisineType?: string[];
  dishType?: string[];
  healthLabels?: string[];
}

export const RecipeDescriptionTypes = ({
  cuisineType,
  dishType,
  healthLabels,
}: Props) => {
  return (
    <Paper withBorder p='md' radius='md'>
      {Boolean(cuisineType) && (
        <Box>
          <Text color='dimmed' size='xs' transform='uppercase' weight={700}>
            CRUISINE TYPE
          </Text>
          <Group mt='sm'>
            {cuisineType?.map((type, idx) => (
              <Badge color='green' key={idx}>
                {type}
              </Badge>
            ))}
          </Group>
        </Box>
      )}
      <Space h='xl' />
      {Boolean(dishType) && (
        <Box>
          <Text color='dimmed' size='xs' transform='uppercase' weight={700}>
            DISH TYPE
          </Text>
          <Group mt='sm'>
            {dishType?.map((type, idx) => (
              <Badge key={idx}>{type}</Badge>
            ))}
          </Group>
        </Box>
      )}
      <Space h='xl' />
      {Boolean(healthLabels) && (
        <Box sx={{ maxWidth: "max-content" }}>
          <Text color='dimmed' size='xs' transform='uppercase' weight={700}>
            HEALTH
          </Text>
          <Group mt='sm'>
            {healthLabels?.slice(0, 6).map((value, idx) => (
              <Badge color='yellow' key={idx}>
                {value}
              </Badge>
            ))}
          </Group>
        </Box>
      )}
    </Paper>
  );
};
