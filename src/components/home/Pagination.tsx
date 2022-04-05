import { Button, Center, Group } from "@mantine/core";
import { useAppDispatch } from "@redux-store/hooks";
import React from "react";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";
import { setNextPage } from "./home.store/querySlice";
import { getLinkHrefCountParam } from "@utils/formatter";

export const Pagination = ({ url = "" }: { url?: string }) => {
  const dispatch = useAppDispatch();

  return (
    <Center mt='xl'>
      <Group spacing='xl'>
        <Button
          onClick={() => dispatch(setNextPage(url ?? ""))}
          rightIcon={<ArrowRight size={20} />}
          color='green'
        >
          MORE
        </Button>
      </Group>
    </Center>
  );
};
