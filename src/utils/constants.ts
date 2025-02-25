export const ColorType = {
  PRIMARY: "primary",
  BLACK: "black",
  SUCCESS: "success",
  ERROR: "error",
  SECONDARY: "secondary",
} as const;

export type ColorType = (typeof ColorType)[keyof typeof ColorType];
