import { Typography, TypographyProps } from "@mui/material";
import Link from "next/link";

type TextProps = {
  font?: boolean;
} & TypographyProps;

const Text: React.FC<TextProps & React.ComponentPropsWithRef<"a">> = ({
  children,
  className,
  font,
  variant,
  href,
  ...rest
}) => {
  const fontClassName = font ? "font-jaini-purva" : undefined;
  const textClassName = [fontClassName, className].filter(Boolean).join(" "); // Ensure no undefined classes

  return (
    <Typography variant={variant} className={textClassName} {...rest}>
      {href ? <Link href={href}>{children}</Link> : children}
    </Typography>
  );
};

export default Text;
