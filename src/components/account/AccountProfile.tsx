import { UserWithFavorite } from "@hooks/auth/useAuth";
import { Avatar, Box, Group, Paper, Text } from "@mantine/core";
import React from "react";

interface Props {
  user: UserWithFavorite | null;
}

export const AccountProfile = ({ user }: Props) => {
  return (
    <Paper withBorder shadow='md' px='lg' py='xl'>
      <Group>
        <Avatar
          size='xl'
          src={`https://robohash.org/${user?.name}`}
          alt={user?.name}
        />
        <Box>
          <Text size='lg' weight='bold' transform='uppercase'>
            {user?.name}{" "}
            <Text
              component='span'
              color='dimmed'
              size='xs'
              transform='lowercase'
            >
              ({user?.role} user)
            </Text>
          </Text>
          <Text size='sm' color='dimmed'>
            {user?.email}
          </Text>
        </Box>
      </Group>
      <Box mt='xl'>
        <Text size='lg' weight={500}>
          No. of Recipes Favorite ({user?.favorites.length})
        </Text>
      </Box>
    </Paper>
  );
};
