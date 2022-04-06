import {
  Badge,
  Box,
  DefaultMantineColor,
  Group,
  Paper,
  Space,
  Text,
} from "@mantine/core";
import { isEmpty } from "lodash";
import React from "react";

interface Props {
  cuisineType?: string[];
  dishType?: string[];
  healthLabels?: string[];
}

const TypeCard = ({
  title,
  data,
  color = "default",
}: {
  title: string;
  data?: string[];
  color?: DefaultMantineColor;
}) => (
  <Box>
    <Text color='dimmed' size='xs' transform='uppercase' weight={700}>
      {title}
    </Text>
    <Group mt='sm'>
      {data?.map((type, idx) => (
        <Badge color={color} key={idx}>
          {type}
        </Badge>
      ))}
    </Group>
  </Box>
);

export const RecipeDescriptionTypes = ({
  cuisineType,
  dishType,
  healthLabels,
}: Props) => (
  <Paper withBorder p='md' radius='md'>
    {!isEmpty(cuisineType) && (
      <TypeCard color='green' title='CRUISINE TYPE' data={cuisineType} />
    )}
    <Space h='xl' />
    {!isEmpty(dishType) && <TypeCard title='DISH TYPE' data={dishType} />}
    <Space h='xl' />
    {!isEmpty(healthLabels) && (
      <TypeCard
        color='yellow'
        title='HEALTH'
        data={healthLabels?.slice(0, 6)}
      />
    )}
  </Paper>
);
