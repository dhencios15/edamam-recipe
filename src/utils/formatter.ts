import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getLinkHrefCountParam = (href: string = "") => {
  const getValues = href.split(/&| /);
  const getCount = getValues.filter((d) => d.includes("_cont")).join("");
  return getCount.split("_cont=")[1] || "";
};

export const getRecipeId = (href?: string) => href?.split("#recipe_")[1] || "";

export const toSlug = (value?: string) =>
  value?.toLowerCase().split(" ").join("-");

export const timeFromNow = (date: string) => dayjs(date).fromNow();
