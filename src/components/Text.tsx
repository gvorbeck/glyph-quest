import { Typography } from "@mui/material";

type TextProps = {
  font?: boolean;
  level?:
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2";
};

const Text: React.FC<TextProps & React.ComponentPropsWithRef<"div">> = ({
  children,
  className,
  font,
  level,
}) => {
  const fontClassName = font ? "font-jaini-purva" : undefined;
  const textClassName = [fontClassName, className].join(" ");
  return (
    <Typography variant={level} className={textClassName}>
      {children}
    </Typography>
  );
};

export default Text;
