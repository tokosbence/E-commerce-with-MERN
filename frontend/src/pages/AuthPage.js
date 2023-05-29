import { Grid } from "@mui/material";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import NavBar from "../components/NavBar";

const AuthPage = () => {
  const [loginShow, setLoginShow] = useState(true);

  const handleSignup = () => {
    setLoginShow(!loginShow);
  };

  return (
    <React.Fragment>
      <NavBar />

      <Grid
        container
        direction="column"
        alignContent="center"
        justifyContent="center"
        gap={5}
        style={{ paddingTop: "50px" }}
      >
        <Grid item>
          {loginShow ? (
            <LoginForm showSignup={handleSignup} />
          ) : (
            <RegisterForm showSignup={handleSignup} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AuthPage;
