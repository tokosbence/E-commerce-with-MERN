import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import {
  Typography,
  Grid,
  Stack,
  Divider,
  Chip,
  Paper,
  Button,
} from "@mui/material";
import Card from "@mui/material/Card";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get("http://localhost:5000/order/" + userId);
      setOrders(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const sortByDateASC = () => {
    let arrayForSort = [...orders];
    //ascending
    const ascArray = arrayForSort.sort((a, b) => {
      const date1 = new Date(a.createdDate);
      const date2 = new Date(b.createdDate);
      return date1 - date2;
    });
    setOrders(ascArray);
  };

  const sortByDateDESC = () => {
    let arrayForSort = [...orders];
    //descending
    const ascArray = arrayForSort.sort((a, b) => {
      const date1 = new Date(a.createdDate);
      const date2 = new Date(b.createdDate);
      return date2 - date1;
    });
    setOrders(ascArray);
  };

  return (
    <React.Fragment>
      <NavBar />
      <Grid
        container
        alignContent="center"
        alignItems="center"
        justifyContent="space-around"
        sx={{ paddingTop: 2 }}
      >
        <Typography variant="h3">Order history</Typography>
        <Stack direction="row" gap={2}>
          <Tooltip title="Ascending">
            <Button
              variant="contained"
              onClick={sortByDateASC}
              startIcon={<FilterListIcon />}
              endIcon={<ExpandLessIcon />}
            >
              Date
            </Button>
          </Tooltip>
          <Tooltip title="Descending">
            <Button
              variant="contained"
              onClick={sortByDateDESC}
              startIcon={<FilterListIcon />}
              endIcon={<ExpandMoreIcon />}
            >
              Date
            </Button>
          </Tooltip>
        </Stack>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        gap={2}
        sx={{ paddingTop: 5 }}
      >
        {orders !== undefined &&
          orders.map((Orderitem) => (
            <Grid item key={Orderitem._id}>
              <Card key={Orderitem._id} sx={{ height: 400 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between">
                    <div>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Order number:
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.primary">
                        {Orderitem._id}
                      </Typography>
                    </div>
                    <div>
                      <Typography sx={{ fontSize: 14 }} color="text.primary">
                        {Orderitem.createdDate}
                      </Typography>
                    </div>
                  </Stack>
                  <Chip label="Processing..." />
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignContent="center"
                    alignItems="center"
                    gap={2}
                    paddingTop={2}
                  >
                    <Grid item>
                      <TableContainer
                        component={Paper}
                        sx={{
                          overflow: "scroll",
                          overflowX: "hidden",
                          maxHeight: 300,
                        }}
                      >
                        <Table sx={{ width: 300 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Product</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Total</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {JSON.parse(Orderitem.items).map((item) => (
                              <TableRow
                                key={item._id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {item.title}
                                </TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{Orderitem.totalAmount}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>

                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ borderRightWidth: 5 }}
                    />
                    <br />
                    <Grid item>
                      <Stack direction="column" gap={1}>
                        <Typography variant="h6">Order details:</Typography>
                        <Divider />
                        <Typography>
                          {Orderitem.firstName} {Orderitem.lastName}
                        </Typography>
                        <Typography variant="h6">Shipping:</Typography>
                        <Divider />
                        <Typography>{Orderitem.address}</Typography>
                        <Typography>{Orderitem.zipCode}</Typography>
                        <Typography>{Orderitem.country}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default OrdersPage;
