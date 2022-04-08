import { useMutation, useQuery, useQueryClient } from "react-query";

import { apiPrisma } from "@utils/auth";
import { IMsg } from "src/pages/account";
import { MessageWithReciever } from "@utils/types";

export const fetchChats = async (receiverId: number | null) =>
  await apiPrisma.get(`/chat/${receiverId}`).then((res) => res.data);

export const useChats = (receiverId: number | null) =>
  useQuery<MessageWithReciever[], Error>(
    ["chats", receiverId],
    () => fetchChats(receiverId),
    { enabled: !!receiverId, staleTime: 1000 * 1 }
  );

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation((message: IMsg) => apiPrisma.post(`/chat`, message), {
    onSuccess: () => queryClient.invalidateQueries(["me"]),
  });
};
