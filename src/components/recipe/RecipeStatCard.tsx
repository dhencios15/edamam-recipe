import React from "react";
import { Group, Paper, Text } from "@mantine/core";

interface Props {
  icon: React.ReactNode;
  title: string;
  statValue?: number | string;
}

export function RecipeStatCard({ icon, title, statValue }: Props) {
  return (
    <Paper sx={{ width: 225 }} withBorder p='md' radius='md'>
      <Group position='apart'>
        {icon}
        <div>
          <Text color='dimmed' size='xs' transform='uppercase' weight={700}>
            {title}
          </Text>
          <Text weight={700} align='right' size='xl'>
            {statValue}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}
