export default function (date) {
  const d = new Date(date);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return d.toLocaleString("en-US", options);
}
