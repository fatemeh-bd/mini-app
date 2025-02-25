import { ButtonHTMLAttributes, SVGElementType } from "react";
import { ColorType } from "../../utils/constants";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  children: React.ReactNode;
  className?: string;
  themeType?: ColorType;
  outline?: boolean;
  full?: boolean;
  Icon?: SVGElementType;
  loading?: boolean;
};
export interface ButtonLinkProps extends ButtonProps {
  href: string;
}
