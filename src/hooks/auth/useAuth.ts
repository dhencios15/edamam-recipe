import { User } from "@prisma/client";
import { apiPrisma } from "@utils/auth";
import { useQuery } from "react-query";

export const useGetMe = () =>
  useQuery(["me"], () => apiPrisma.get<User>("/me").then((res) => res.data));
