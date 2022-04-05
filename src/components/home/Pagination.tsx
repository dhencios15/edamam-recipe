import { Button, Center, Group } from "@mantine/core";
import React from "react";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";

export const Pagination = () => {
  return (
    <Center mt='xl'>
      <Group spacing='xl'>
        <Button leftIcon={<ArrowLeft size={20} />} color='gray'>
          PREV
        </Button>
        <Button rightIcon={<ArrowRight size={20} />} color='green'>
          NEXT
        </Button>
      </Group>
    </Center>
  );
};
