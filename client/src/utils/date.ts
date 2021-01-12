export const getDate = (date: string | number | Date) => {
  return new Date(date).toLocaleDateString("en-gb", {
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
