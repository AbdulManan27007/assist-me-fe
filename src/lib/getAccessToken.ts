export const getAccessToken = () => {
  return typeof window !== "undefined"
    ? document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("accessToken"))
        ?.split("=")
        .at(-1)
    : "";
};
