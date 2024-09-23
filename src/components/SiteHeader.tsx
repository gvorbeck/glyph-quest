import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { User } from "firebase/auth";
import { useState } from "react";
import Text from "./Text";
import Link from "next/link";
import { Castle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "@/lib/firebase";

const pages = [{ name: "New Character", link: "/characters/new" }];

type SiteHeaderProps = {
  user: User | null;
};

const SiteHeader: React.FC<SiteHeaderProps> = ({ user }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar className="static">
      <Container maxWidth="2xl">
        <Toolbar disableGutters>
          <Link href="/" className="flex gap-2 items-center">
            <Castle className="xs:hidden md:block" />
            <Text
              variant="h1"
              noWrap
              className="text-amber mr-4 xs:hidden md:block font-bold tracking-widest text-inherit decoration-0 text-3xl"
              font
            >
              Glyph.Quest
            </Text>
          </Link>
          <Box sx={{ display: { xs: "flex", md: "none" } }} className="grow-0">
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={`${page.link}`}>{page.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link href="/" className="flex gap-1 items-center">
            <Castle className="xs:block md:hidden" />
            <Text
              variant="h1"
              noWrap
              className="text-amber mr-4 xs:block md:hidden font-bold tracking-widest text-inherit decoration-0 text-3xl"
              font
            >
              Glyph.Quest
            </Text>
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
            <Box className="ml-auto">
              <Tooltip title="Log out">
                <IconButton onClick={() => auth.signOut()} className="p-0">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SiteHeader;
