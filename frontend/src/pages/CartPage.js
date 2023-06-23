import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import {
  Grid,
  Button,
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Table,
  IconButton,
  Typography,
  Stack,
  Card,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Avatar from "@mui/material/Avatar";
import NavBar from "../components/NavBar";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MarkunreadMailbox from "@mui/icons-material/MarkunreadMailbox";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import emptyCart from "../img/emptycart.png";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { addToCart, removeFromCart } from "../store/cart/cartActions";
import { useDispatch } from "react-redux";
import axios from "axios";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const addedItems = useSelector((state) => state.cartStore.addedItems);
  const total = useSelector((state) => state.cartStore.total);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [accountDialog, setAccountDialog] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [confirmShow, setConfirmShow] = React.useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });

  useEffect(() => {
    if (total !== undefined) {
      setTotalAmount(`$${total.toFixed(2)}`);
    }
  }, [total, addedItems, totalAmount]);

  const goBack = () => {
    navigate("/");
  };

  const cartItemRemoveHandler = (id) => {
    console.log(id);
    dispatch(removeFromCart(id));
  };

  const cartItemAddHandler = (item) => {
    console.log(item);
    const product_item = {
      product: item,
      amount: 1,
    };
    dispatch(addToCart(product_item));
  };

  const handleCheckout = async () => {
    if (!authContext.token) {
      setOpen(true);
    } else {
      setConfirmShow(true);
    }
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setCheckoutForm({ ...checkoutForm, [name]: value });
  };

  const handleGoToLogin = () => {
    setShowLogin(true);
    setAccountDialog(true);
    setOpen(false);
  };

  const handleCreateAccount = () => {
    setShowLogin(false);
    setAccountDialog(true);
    setOpen(false);
  };

  const handleCloseAccountDialog = async () => {
    setAccountDialog(false);
    setConfirmShow(true);
  };

  const handleCancel = () => {
    setConfirmShow(false);
  };

  const handleConfirm = async () => {
    const order = {
      userID: localStorage.getItem("userId"),
      firstName: checkoutForm.firstName,
      lastName: checkoutForm.lastName,
      address: checkoutForm.address,
      city: checkoutForm.city,
      country: checkoutForm.country,
      zipCode: checkoutForm.zipCode,
      totalAmount: totalAmount,
      items: addedItems,
      createdDate: new Date(),
    };
    try {
      const response = await axios.post("http://localhost:5000/order/create", {
        data: order,
      });
      console.log(response.data);
      if (response.data === "Order saved to the database!") {
        setConfirmShow(false);
        navigate("/orders");
      }
    } catch (e) {
      console.log(e);
    }
    console.log(order);
  };
  return (
    <React.Fragment>
      <NavBar />
      {addedItems.length !== 0 ? (
        <>
          <Grid
            container
            direction="row"
            alignContent="center"
            justifyContent="center"
            sx={{ paddingTop: 5 }}
          >
            <Grid item xs={5}>
              <Paper
                elevation={3}
                sx={{
                  width: 550,
                }}
              >
                <Grid
                  container
                  alignContent="center"
                  alignItems="center"
                  justifyContent="center"
                >
                  <TableContainer
                    component={Paper}
                    sx={{
                      overflow: "scroll",
                      overflowX: "hidden",
                      maxHeight: 500,
                    }}
                  >
                    <Table sx={{ width: 550 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {addedItems.map((item) => (
                          <TableRow
                            key={item._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Stack direction="row" gap={1}>
                                <Avatar src={item.images} variant="square" />
                                {item.title}
                              </Stack>
                            </TableCell>
                            <TableCell align="right">${item.price}</TableCell>
                            <TableCell align="right">
                              <Stack
                                direction="row"
                                gap={2}
                                sx={{ alignItems: "center" }}
                              >
                                <IconButton
                                  aria-label="add"
                                  size="medium"
                                  onClick={cartItemAddHandler.bind(null, item)}
                                >
                                  <AddIcon fontSize="inherit" />
                                </IconButton>
                                <Typography variant="h5">
                                  {item.quantity}
                                </Typography>
                                <IconButton
                                  aria-label="remove"
                                  size="medium"
                                  onClick={cartItemRemoveHandler.bind(
                                    null,
                                    item._id
                                  )}
                                >
                                  <RemoveIcon fontSize="inherit" />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <br />
                <Card sx={{ backgroundColor: "#2196f3", maxWidth: 550 }}>
                  <Stack direction="row" justifyContent="space-around">
                    <Typography variant="h6" color="whitesmoke">
                      Total amount:
                    </Typography>
                    <Typography variant="h6" color="whitesmoke">
                      {totalAmount}
                    </Typography>
                  </Stack>
                  <Stack direction="row"></Stack>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={5}>
              <Paper
                elevation={3}
                style={{
                  width: 500,
                  paddingTop: 5,
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  alignContent="center"
                  justifyContent="center"
                  spacing={3}
                >
                  <Grid item>
                    <Typography variant="h5">Checkout form</Typography>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      alignContent="center"
                      justifyContent="center"
                      gap={3}
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          alignContent="center"
                          justifyContent="center"
                          gap={5}
                          //style={{ paddingTop: "20px" }}
                        >
                          <Grid item>
                            <TextField
                              label="First Name"
                              type="text"
                              sx={{ width: 230 }}
                              name="firstName"
                              value={checkoutForm.firstName || ""}
                              onChange={handleFormInput}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircle />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              label="Last Name"
                              type="text"
                              name="lastName"
                              value={checkoutForm.lastName || ""}
                              onChange={handleFormInput}
                              sx={{ width: 230 }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircle />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              label="Address"
                              type="text"
                              name="address"
                              value={checkoutForm.address || ""}
                              onChange={handleFormInput}
                              sx={{ width: 230 }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <HomeIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          alignContent="center"
                          justifyContent="center"
                          gap={5}
                          //style={{ paddingTop: "20px" }}
                        >
                          <Grid item>
                            <TextField
                              label="City"
                              type="text"
                              name="city"
                              value={checkoutForm.city || ""}
                              onChange={handleFormInput}
                              sx={{ width: 230 }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCityIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              label="Country"
                              type="text"
                              name="country"
                              value={checkoutForm.country || ""}
                              onChange={handleFormInput}
                              sx={{ width: 230 }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <FlagIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              label="Zip code"
                              type="text"
                              name="zipCode"
                              value={checkoutForm.zipCode || ""}
                              onChange={handleFormInput}
                              sx={{ width: 230 }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <MarkunreadMailbox />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Button variant="contained" onClick={handleCheckout}>
                      Checkout
                    </Button>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid
            container
            direction="column"
            alignItems="center"
            alignContent="center"
            justifyContent="center"
            sx={{ paddingTop: 2 }}
          >
            <Grid item>
              <Button
                variant="contained"
                onClick={goBack}
                endIcon={<LocalMallIcon />}
              >
                Back to shop
              </Button>
            </Grid>
            <Grid item>
              <img src={emptyCart} alt="empty cart" />
            </Grid>
          </Grid>
        </>
      )}

      <React.Fragment>
        <Dialog
          open={open}
          //onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you have an account?"}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={handleCreateAccount}
              variant="contained"
              color="secondary"
            >
              Create
            </Button>
            <Button
              onClick={handleGoToLogin}
              variant="contained"
              color="primary"
              autoFocus
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <Dialog
        open={accountDialog}
        onClose={handleCloseAccountDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {showLogin ? (
            <LoginForm closeForm={handleCloseAccountDialog} />
          ) : (
            <RegisterForm closeForm={handleCloseAccountDialog} />
          )}
        </DialogContent>
      </Dialog>
      <React.Fragment>
        <Dialog
          open={confirmShow}
          onClose={handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you confirm the order?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCancel} variant="contained" color="error">
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="success"
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </React.Fragment>
  );
};

export default CartPage;
