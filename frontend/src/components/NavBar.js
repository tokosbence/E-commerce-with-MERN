import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NavBar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("isAdmin"));
  }, [token]);

  const goToHome = () => {
    navigate("/");
  };

  const goToAddProduct = () => {
    navigate("/addProduct");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
              }}
            >
              E-COM
            </Typography>
            <Button color="inherit" onClick={goToHome}>
              Home
            </Button>
            {isAdmin && (
              <Button color="inherit" onClick={goToAddProduct}>
                Add product
              </Button>
            )}
            {!token ? (
              <Button color="inherit" onClick={goToLogin}>
                Login
              </Button>
            ) : (
              <Button color="inherit" onClick={logOut}>
                LogOut
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default NavBar;
