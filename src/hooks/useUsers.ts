import { useMutation, useQuery, useQueryClient } from "react-query";

import { apiPrisma } from "@utils/auth";
import { IMsg } from "src/pages/account";
import { MessageWithReciever } from "@utils/types";

export type UsersRole = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export const fetchUsers = async (role: string) =>
  await apiPrisma.get(`/users/${role}`).then((res) => res.data);

export const useUsers = (role: string) =>
  useQuery<UsersRole[], Error>(["users", role], () => fetchUsers(role), {
    enabled: !!role,
  });
