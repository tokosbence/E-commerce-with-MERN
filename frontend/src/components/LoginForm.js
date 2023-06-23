import React, { useState } from "react";
import { Paper, TextField, Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const authContext = React.useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(loginData);

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        data: loginData,
      });
      console.log(response.data);
      if (response) {
        if (Object.keys(props)[0] !== "closeForm") {
          console.log(response.data);
          authContext.login(
            response.data.token,
            response.data.userId,
            response.data.isAdmin
          );
          if (response.data.isAdmin === true) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          authContext.login(
            response.data.token,
            response.data.userId,
            response.data.isAdmin
          );
          props.closeForm();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Paper
        elevation={3}
        style={{
          width: 500,
        }}
      >
        <Grid
          container
          direction="column"
          alignContent="center"
          justifyContent="center"
          gap={5}
          style={{ paddingTop: "50px" }}
        >
          <Grid item>
            <TextField
              label="E-mail"
              variant="outlined"
              type="text"
              name="email"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <Box
              textAlign="center"
              justifyContent="center"
              sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
            >
              <Button variant="contained" onClick={handleSubmit}>
                Login
              </Button>
              {Object.keys(props)[0] !== "closeForm" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={props.showSignup}
                >
                  Sign up
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item />
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default LoginForm;
