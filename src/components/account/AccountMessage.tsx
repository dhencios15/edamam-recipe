import React from "react";
import { Avatar, Box, Group, Paper, Text } from "@mantine/core";

import { timeFromNow } from "@utils/formatter";
import { UserWithFavorite } from "@hooks/auth/useAuth";
import { MessageWithReciever } from "@utils/types";

interface Props {
  chat: MessageWithReciever;
  user?: UserWithFavorite | null;
}

export const AccountMessage = ({ chat, user }: Props) => {
  return (
    <Paper
      withBorder
      p='md'
      radius='md'
      shadow='sm'
      sx={(th) => ({
        alignSelf: `${chat.senderId === user?.id ? "end" : "start"}`,
        maxWidth: "70%",
        backgroundColor: `${
          chat.senderId === user?.id ? th.colors.blue[1] : th.colors.gray[2]
        }`,
      })}
    >
      <Group mb={-4}>
        <Avatar src='https://robohash.org/admin' alt='robot' radius='xl' />
        <Box>
          <Text size='sm' transform='capitalize'>
            {chat.senderId === chat.from.id ? chat.from.name : chat.to.name}
          </Text>
          <Text size='xs' color='dimmed'>
            {timeFromNow(`${chat.createdAt}`)}
          </Text>
        </Box>
      </Group>
      <Text
        sx={(th) => ({
          paddingLeft: 54,
          paddingTop: th.spacing.sm,
        })}
        size='sm'
      >
        {chat.text}
      </Text>
    </Paper>
  );
};
