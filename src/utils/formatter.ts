export const getLinkHrefCountParam = (href: string) => {
  const getValues = href.split(/&| /);
  const getCount = getValues.filter((d) => d.includes("_cont")).join("");
  return getCount.split("_cont=")[1] || "";
};
