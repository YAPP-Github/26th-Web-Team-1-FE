export const getVar = (value: `--${string}`, fallback?: string) => {
  return `var(${value}${fallback ? `, ${fallback}` : ""})`;
};
