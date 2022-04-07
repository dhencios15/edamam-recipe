import axios from "axios";

export const apiPrisma = axios.create({
  baseURL: `/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
