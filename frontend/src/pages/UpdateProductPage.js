import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import UpdateProduct from "../components/UpdateProduct";

const UpdateProductPage = () => {
  return (
    <React.Fragment>
      <NavBar />
      <UpdateProduct />
    </React.Fragment>
  );
};

export default UpdateProductPage;
