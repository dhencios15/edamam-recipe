import React from "react";
import { Button, Group, TextInput } from "@mantine/core";
import { Send } from "tabler-icons-react";

interface Props {
  msg: string;
  connected?: boolean;
  setMsg: (value: string) => void;
  sendMessage: () => void;
  sending: boolean;
}

export type Ref = HTMLInputElement;

// eslint-disable-next-line
export const AccountSendMessage = React.forwardRef<Ref, Props>(
  ({ msg, connected = false, setMsg, sendMessage, sending }, ref) => {
    return (
      <Group position='right' align='center'>
        <TextInput
          ref={ref}
          size='md'
          value={msg}
          placeholder={connected ? "Type a message..." : "Connecting..."}
          disabled={!connected}
          sx={{ width: 500 }}
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
    );
  }
);
