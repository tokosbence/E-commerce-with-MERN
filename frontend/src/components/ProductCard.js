import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { addToCart, removeFromCart } from "../store/cart/cartActions";
import { useDispatch } from "react-redux";
import axios from "axios";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(props.product);
  const [token, setToken] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const amountInputRef = useRef();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("isAdmin"));
  }, [token]);

  const handleUpdate = (id) => {
    navigate("/update/" + id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("http://localhost:5000/delete/" + id);
      console.log(response.data);
      if (response.data === "Product deleted!") {
        props.getProduct();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = (product) => {
    console.log(amountInputRef.current.value);
    const product_item = {
      product: product,
      amount: amountInputRef.current.value,
    };
    dispatch(addToCart(product_item));
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          width: 345,
          height: 550,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <CardHeader title={product.title} />
        <CardMedia
          component="img"
          height="194"
          image={product.images}
          alt="Product image"
        />
        <CardContent>
          <Stack direction="column" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body1" color="text.primary">
                {product.rating}
              </Typography>
            </Stack>
            <Stack direction="column">
              <Typography variant="body1" color="text.primary">
                {product.price} $
              </Typography>
              <Typography variant="body1" color="text.primary">
                Price discount: {product.discountPercentage}%
              </Typography>
            </Stack>
          </Stack>
        </CardContent>

        <CardActions>
          {token && isAdmin === "true" ? (
            <Stack direction="row" gap={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleUpdate(product._id)}
              >
                Update
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </Stack>
          ) : (
            <>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AddShoppingCartIcon />}
                  onClick={() => handleAddToCart(product)}
                >
                  + Add
                </Button>
                <TextField
                  inputRef={amountInputRef}
                  sx={{ width: 70 }}
                  label="Amount"
                  id={"amount_" + props.id}
                  type="number"
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={1}
                />
              </Stack>
            </>
          )}
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default ProductCard;
