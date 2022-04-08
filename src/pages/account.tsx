import React from "react";
import { io } from "socket.io-client";
import {
  Button,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Textarea,
} from "@mantine/core";

import { selectRole, selectUser } from "@redux-store/authSlice";
import { useAppSelector } from "@redux-store/hooks";
import { Message, Send, Users } from "tabler-icons-react";
import { useChats, useSendMessage } from "@hooks/useChats";
import { isEmpty } from "lodash";
import { useQueryClient } from "react-query";
import { MessageWithReciever } from "@utils/types";
import { AccountMessage } from "@components/account/AccountMessage";
import { AccountProfile } from "@components/account/AccountProfile";

import { AccountUsers } from "@components/account/AccountUsers";

export interface IMsg {
  receiverId: number;
  message: string;
}

const BASE_URL = process.env.BASE_URL;

export default function Account() {
  const queryClient = useQueryClient();
  const user = useAppSelector(selectUser);
  const role = useAppSelector(selectRole);
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const [connected, setConnected] = React.useState<boolean>(false);
  const [msg, setMsg] = React.useState<string>("");
  const [selectedChat, setSelectedChat] = React.useState<number | null>(null);

  const chatsQuery = useChats(selectedChat);
  const sendMutate = useSendMessage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [chatsQuery.data]);

  React.useEffect((): any => {
    // connect to socket server
    const socket = io(`http://localhost:3000`, {
      path: "/api/socketio",
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: MessageWithReciever) => {
      queryClient.invalidateQueries(["chats"]);
      queryClient.invalidateQueries(["users"]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
    // eslint-disable-next-line
  }, []);

  const sendMessage = async () => {
    if (!isEmpty(inputRef?.current?.value) && selectedChat) {
      // build message obj
      const message: IMsg = {
        receiverId: selectedChat,
        message: inputRef?.current?.value || "",
      };
      try {
        await sendMutate.mutateAsync(message);
        inputRef?.current?.focus();
        setMsg("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sending = sendMutate.isLoading;

  return (
    <>
      <AccountProfile user={user} />
      <Tabs mt='lg'>
        <Tabs.Tab label='Messages' icon={<Message size={14} />}>
          <Grid>
            <Grid.Col span={4}>
              <ScrollArea
                mb='md'
                sx={(th) => ({
                  height: "100%",
                  maxHeight: 750,
                  borderRadius: th.radius.md,
                })}
                offsetScrollbars
              >
                <div ref={messagesEndRef}></div>
                <AccountUsers
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                />
              </ScrollArea>
            </Grid.Col>
            <Grid.Col span={8}>
              {selectedChat ? (
                <ScrollArea
                  mb='md'
                  sx={(th) => ({ maxHeight: 750, borderRadius: th.radius.md })}
                  offsetScrollbars
                >
                  <Paper my='lg' p='md'>
                    <Stack spacing='xl'>
                      {chatsQuery.isLoading ? (
                        <>
                          <Skeleton height={50} width='50%' radius='xl' />
                          <Skeleton height={50} radius='xl' />
                        </>
                      ) : !isEmpty(chatsQuery?.data) ? (
                        chatsQuery?.data?.map((chat) => (
                          <AccountMessage
                            key={chat.id}
                            chat={chat}
                            user={user}
                          />
                        ))
                      ) : (
                        <Paper mt='lg' p='sm' pt='xl' sx={{ height: 250 }}>
                          <Text align='center'>
                            Start your first conversation
                          </Text>
                        </Paper>
                      )}
                    </Stack>
                  </Paper>
                  <div ref={messagesEndRef}></div>
                </ScrollArea>
              ) : (
                <Paper mt='lg' p='sm' pt='xl' sx={{ height: 250 }}>
                  <Text align='center'>No selected user to chat. 👤</Text>
                </Paper>
              )}
            </Grid.Col>
          </Grid>
        </Tabs.Tab>
        {role === "ADMIN" && (
          <Tabs.Tab label='Users' icon={<Users size={14} />}>
            Messages tab content
          </Tabs.Tab>
        )}
      </Tabs>

      {selectedChat && (
        <Group position='right' align='center'>
          <Textarea
            ref={inputRef}
            size='md'
            value={msg}
            placeholder={connected ? "Type a message..." : "Connecting..."}
            disabled={!connected}
            sx={{ width: "100%", maxWidth: 300 }}
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <Button
            rightIcon={<Send size={16} />}
            onClick={sendMessage}
            disabled={!connected}
            loading={sending}
          >
            {sending ? "SENDING..." : "SEND"}
          </Button>
        </Group>
      )}
    </>
  );
}
