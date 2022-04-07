import React from "react";
import { FileDownload, Heart } from "tabler-icons-react";
import { ActionIcon, Group, Title, Tooltip } from "@mantine/core";
import { useModals } from "@mantine/modals";

import { UserWithFavorite } from "@hooks/auth/useAuth";
import { DigestEnty, Recipe } from "@utils/types";

interface Props {
  recipe?: Recipe & { digest: DigestEnty[] };
  isFavorite?: boolean;
  onHandleFavoriteAction: () => void;
  user?: UserWithFavorite | null;
  isLoading: boolean;
}

export const RecipeHeader = ({
  recipe,
  isFavorite,
  onHandleFavoriteAction,
  user,
  isLoading,
}: Props) => {
  const modals = useModals();

  const onOpenDownloadModal = () => {
    user
      ? modals.openContextModal("downloadmodal", {
          title: `Select file type to Download`,
          innerProps: {
            recipe,
          },
        })
      : modals.openContextModal("authmodal", {
          title: `Ops ⚠! You need to sign in to access this feature`,
          innerProps: {},
        });
  };

  return (
    <Group align='center' position='center'>
      <Title align='center' sx={(th) => ({ color: th.colors.green[7] })}>
        {recipe?.label}
      </Title>
      <Tooltip
        label={
          isFavorite ? "Remove to my favorite list" : "Add to favorite list"
        }
        withArrow
      >
        <ActionIcon
          loading={isLoading}
          onClick={onHandleFavoriteAction}
          color='red'
          variant={isFavorite ? "filled" : "hover"}
        >
          <Heart size={30} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Download (CSV or PDF)' withArrow>
        <ActionIcon color='blue' onClick={onOpenDownloadModal}>
          <FileDownload size={30} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
