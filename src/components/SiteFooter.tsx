import { Link, Typography } from "@mui/material";

type SiteFooterProps = {};

const SiteFooter: React.FC<SiteFooterProps> = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="lg:max-w-[1000px] mx-auto w-full pt-4 pl-8 pr-4">
      <Typography variant="body2">
        © {currentYear}{" "}
        <Link
          href="https://iamgarrett.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          J. Garrett Vorbeck
        </Link>
        . GLYPH.QUEST
      </Typography>
      <Typography variant="body2">
        This site is based on the game{" "}
        <Link
          href="https://questingblog.com/maze-rats/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Maze Rats
        </Link>
        .
      </Typography>
    </footer>
  );
};

export default SiteFooter;
