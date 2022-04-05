import React from "react";
import { Box, Button, Center, Group, Text } from "@mantine/core";
import { ArrowDown } from "tabler-icons-react";

interface Props {
  nextPage: () => void;
  hasNextPage?: boolean;
  isFetching: boolean;
}

export const Pagination = ({
  nextPage,
  hasNextPage = false,
  isFetching,
}: Props) => {
  return (
    <Center mt='xl'>
      <Group spacing='xs' direction='column' align='center'>
        <Button
          onClick={nextPage}
          disabled={!hasNextPage}
          loading={isFetching}
          rightIcon={<ArrowDown size={20} />}
          color='green'
        >
          {isFetching ? "FETCHING..." : "FETCH MORE"}
        </Button>
      </Group>
    </Center>
  );
};
