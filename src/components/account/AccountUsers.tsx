import { useUsers } from "@hooks/useUsers";
import {
  Avatar,
  Box,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { selectRole } from "@redux-store/authSlice";
import { useAppSelector } from "@redux-store/hooks";
import { isEmpty } from "lodash";
import React from "react";

interface Props {
  setSelectedChat: (value: number | null) => void;
  selectedChat: number | null;
}

export const AccountUsers = ({ setSelectedChat, selectedChat }: Props) => {
  const role = useAppSelector(selectRole);
  const chatUsersQuery = useUsers(role === "NORMAL" ? "ADMIN" : "NORMAL");

  return (
    <Paper my='lg' p='md'>
      <Stack spacing='sm'>
        {chatUsersQuery.isLoading ? (
          <>
            <Skeleton height={50} radius='xl' />
            <Skeleton height={50} radius='xl' />
          </>
        ) : !isEmpty(chatUsersQuery.data) ? (
          chatUsersQuery.data?.map((user) => (
            <Paper
              onClick={() => setSelectedChat(user.id)}
              sx={(th) => ({
                backgroundColor:
                  selectedChat === user.id ? th.colors.green[1] : "",
                ":hover": {
                  backgroundColor: th.colors.gray[1],
                  cursor: "pointer",
                },
              })}
              withBorder
              p='sm'
              key={user.id}
            >
              <Group>
                <Avatar
                  size='md'
                  src={`https://robohash.org/${user?.name}`}
                  alt={user?.name}
                />
                <Box>
                  <Text weight='bold' transform='uppercase'>
                    {user?.name}{" "}
                  </Text>
                  <Text size='sm' color='dimmed'>
                    {user?.email}
                  </Text>
                </Box>
              </Group>
            </Paper>
          ))
        ) : (
          <Paper mt='lg' p='sm' pt='xl' sx={{ height: 250 }}>
            <Text align='center'>No Active Users. 👤</Text>
          </Paper>
        )}
      </Stack>
    </Paper>
  );
};
