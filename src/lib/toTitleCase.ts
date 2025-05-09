export const toTitleCase = (str?: string) => {
  if (str) {
    if (/^[a-z]+([A-Z][a-z]*)*$/.test(str)) {
      const words = str.split(/(?=[A-Z])/);
      return words
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    } else {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }
  }
  return "";
};
