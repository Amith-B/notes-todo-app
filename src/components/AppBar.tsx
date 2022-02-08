import * as React from "react";
import TopBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout, selectIsLoggedIn } from "../store/reducers/authSlice";

const pages = [
  {
    name: "Notes",
    link: "/notes",
  },
  { name: "Todo", link: "/todo" },
];
const settings: string[] = ["Profile", "Logout"];

function CustomLink({
  children,
  to,
  textColor,
  ...props
}: LinkProps & { textColor?: { active: string; inactive: string } }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{
          textDecoration: "none",
          background: match ? "orange" : "unset",
          padding: "10px 16px",
          fontSize: "1.2rem",
          color: textColor
            ? match
              ? textColor?.["active"]
              : textColor?.["inactive"]
            : "white",
          borderRadius: "12px",
        }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

const AppBar = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (setting: string) => {
    setAnchorElUser(null);
    switch (setting) {
      case settings[0]:
        break;
      case settings[1]:
        dispatch(logout());
        break;
    }
  };

  return (
    <TopBar position="static" sx={{ zIndex: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "#ffdc00",
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <BorderColorIcon />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ cursor: "default" }}
            >
              NoteIt
            </Typography>
          </Typography>
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
                  <CustomLink
                    key={page.name}
                    to={page.link}
                    textColor={{ active: "white", inactive: "black" }}
                  >
                    {page.name}
                  </CustomLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "#ffdc00",
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <BorderColorIcon />
            <Typography variant="h6" noWrap component="div">
              NoteIt
            </Typography>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <CustomLink key={page.name} to={page.link}>
                {page.name}
              </CustomLink>
            ))}
          </Box>

          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleMenuClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </TopBar>
  );
};
export default AppBar;
