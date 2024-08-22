import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { User } from "firebase/auth";
import Link from "next/link";
import { Castle } from "@mui/icons-material";
import { auth } from "@/lib/firebase";

type SiteHeaderProps = {
  user: User | null;
};

const pages = [{ name: "New Character", link: "/characters/new" }];

const SiteHeader: React.FC<SiteHeaderProps> = ({ user }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar position="static" className="bg-darkGray">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="lg:max-w-[1000px] mx-auto pl-8 pr-4">
          <Link href="/" className="flex gap-2 items-center">
            <Castle sx={{ display: { xs: "none", md: "flex" } }} />
            <Typography
              variant="h1"
              noWrap
              className="mr-4 font-jaini-purva color-inherit text-3xl text-amber"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              Glyph.Quest
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={`${page.link}`}>{page.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Castle
            className="text-amber"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Link href="/" className="font-jaini-purva">
            <Typography
              variant="h5"
              noWrap
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Glyph.Quest
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                variant="outlined"
              >
                <Link href={page.link}>{page.name}</Link>
              </Button>
            ))}
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={user ? user.email : ""}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => auth.signOut()}
                >
                  Log Out
                </Button>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SiteHeader;
