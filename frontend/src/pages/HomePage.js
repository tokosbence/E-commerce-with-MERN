import React, { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/read");
      setProductList(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      {productList.length !== 0 &&
        productList.map((product) => <ProductCard product={product} />)}
    </React.Fragment>
  );
};

export default HomePage;
