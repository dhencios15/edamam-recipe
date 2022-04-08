import React from "react";
import { ActionIcon, Affix, Transition } from "@mantine/core";

import { MessageCircle } from "tabler-icons-react";

export const ChatBox = () => {
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition='slide-up' mounted={true}>
        {(transitionStyles) => (
          <ActionIcon
            size={50}
            variant='filled'
            color='blue'
            radius={100}
            style={transitionStyles}
          >
            <MessageCircle size={35} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
};
