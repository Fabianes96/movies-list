import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./Header.css";
import { AuthContext } from "../../store/auth-context";
import { logout } from "../../services/authService";
import { types } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ image = "" }) => {
  const authCtx = useContext(AuthContext);
  const settings = ["Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOptions = async (e) => {
    if (e.target.id === "Logout") {
      await logout();
      authCtx.dispatch({
        type: types.logout,
      });
    }
  };

  return (
    <AppBar id="header" position="fixed">
      <Container maxWidth="false">
        <Toolbar disableGutters className="header-content">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}
          >
            <Link to="home">Movies List</Link>
          </Typography>

          {authCtx.user?.isLogged && (
            <>
              <Typography
                variant="h6"
                noWrap
                component="div"
                id="text-username"               
              >
                {authCtx.user.name}
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={image !== "" ? image : "/broken-image.jpg"} />
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
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        id={setting}
                        textAlign="center"
                        onClick={handleOptions}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
