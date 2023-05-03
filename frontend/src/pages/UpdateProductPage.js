import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import UpdateProduct from "../components/UpdateProduct";

import axios from "axios";

const UpdateProductPage = () => {
  const [product, setProduct] = useState({});

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <NavBar />
      <UpdateProduct />
    </React.Fragment>
  );
};
