import { UserWithFavorite } from "@hooks/auth/useAuth";
import { useRemoveFavorites } from "@hooks/useFavorites";
import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { toSlug } from "@utils/formatter";
import Link from "next/link";
import React from "react";
import { useQueryClient } from "react-query";
import { Trash } from "tabler-icons-react";

interface Props {
  user: UserWithFavorite | null;
}

export const AccountUsersFavorites = ({ user }: Props) => {
  const queryClient = useQueryClient();
  const favoriteRemoveMutate = useRemoveFavorites();

  const onRemoveFavorites = async (id: string, label: string) => {
    try {
      await favoriteRemoveMutate.mutate(id);
      queryClient.invalidateQueries(["me"]);
      showNotification({
        title: "Awh! 💔",
        message: `${label} is now removed to your favorites`,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <SimpleGrid
      spacing='xl'
      cols={4}
      breakpoints={[
        { maxWidth: "lg", cols: 3, spacing: "md" },
        { maxWidth: "md", cols: 2, spacing: "md" },
        { maxWidth: "xs", cols: 1, spacing: "sm" },
      ]}
    >
      {user?.favorites.map((favorite) => (
        <Card key={favorite.id} shadow='sm' p='lg'>
          <Card.Section>
            <Image src={favorite.image} height={160} alt='Norway' />
          </Card.Section>

          <Group position='apart' my='md'>
            <Link
              href={`/r/${favorite.recipeId}?recipe=${toSlug(favorite.label)}`}
              passHref
            >
              <Text
                sx={(th) => ({
                  ":hover": {
                    color: th.colors.green[7],
                    textDecoration: "underline",
                  },
                })}
                component='a'
                weight={500}
              >
                {favorite.label}
              </Text>
            </Link>
            <Badge color='green' variant='light'>
              {favorite.mealType}
            </Badge>
          </Group>
          <Button
            leftIcon={<Trash size={20} />}
            variant='light'
            color='red'
            fullWidth
            style={{ marginTop: 14 }}
            onClick={() => onRemoveFavorites(favorite.recipeId, favorite.label)}
          >
            Remove to favorites list
          </Button>
        </Card>
      ))}
    </SimpleGrid>
  );
};
