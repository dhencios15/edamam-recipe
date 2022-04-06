import React from "react";
import { Box, Button, Center, Group, Text } from "@mantine/core";
import { ArrowDown } from "tabler-icons-react";

interface Props {
  nextPage: () => void;
  hasNextPage?: boolean;
  isFetching: boolean;
}

export type Ref = HTMLButtonElement;

// eslint-disable-next-line
export const Pagination = React.forwardRef<Ref, Props>(
  ({ nextPage, hasNextPage = false, isFetching }, ref) => {
    return (
      <Center mt='xl'>
        <Group spacing='xs' direction='column' align='center'>
          <Button
            ref={ref}
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
  }
);

// export const Pagination = React.forwardRef({
//   nextPage,
//   hasNextPage = false,
//   isFetching,
// }: Props) => {
//   return (
//     <Center mt='xl'>
//       <Group spacing='xs' direction='column' align='center'>
//         <Button
//           onClick={nextPage}
//           disabled={!hasNextPage}
//           loading={isFetching}
//           rightIcon={<ArrowDown size={20} />}
//           color='green'
//         >
//           {isFetching ? "FETCHING..." : "FETCH MORE"}
//         </Button>
//       </Group>
//     </Center>
//   );
// };
