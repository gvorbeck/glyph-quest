import { Link } from "@mui/material";
import Text from "./Text";

type SiteFooterProps = {};

const SiteFooter: React.FC<SiteFooterProps> = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="lg:max-w-[1000px] mx-auto w-full pt-4 px-4">
      <Text variant="body2">© {currentYear} Glyph.Quest</Text>
      <Text variant="body2">
        Glyph.Quest is an independent production of{" "}
        <Link
          href="https://iamgarrett.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          J. Garrett Vorbeck
        </Link>{" "}
        and is not affiliated with Questing Beast LLC.
      </Text>
    </footer>
  );
};

export default SiteFooter;
