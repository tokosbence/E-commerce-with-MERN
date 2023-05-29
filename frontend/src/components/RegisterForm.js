import React, { useState } from "react";
import { Paper, TextField, Grid, Button, Box } from "@mui/material";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = (props) => {
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = async () => {
    console.log(userData);

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          data: userData,
        }
      );
      console.log(response);
      if (response) {
        if (Object.keys(props)[0] !== "closeForm") {
          authContext.login(
            response.data.token,
            response.data.id,
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
            response.data.id,
            response.data.isAdmin
          );
          props.closeForm();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleIsAdmin = (e) => {
    console.log(e.target.value);
    console.log(checked);
    setChecked(!checked);
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
              label="Username"
              variant="outlined"
              type="text"
              name="username"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
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
          {/* 
          <Grid item>
            <FormControlLabel
              control={<Checkbox onChange={handleIsAdmin} value={checked} />}
              label="Admin"
            />
          </Grid>
          */}
          <Grid item>
            <Box
              textAlign="center"
              justifyContent="center"
              sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
            >
              <Button variant="contained" onClick={handleRegister}>
                Register
              </Button>
              {Object.keys(props)[0] !== "closeForm" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={props.showSignup}
                >
                  Login
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

export default RegisterForm;
