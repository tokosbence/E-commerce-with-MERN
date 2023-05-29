import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
//import not_found_pic from "../../img/not_found.png";

//other components
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

const pageSize = 12;

const AdminPage = () => {
  const [productList, setProductList] = useState([]);

  return (
    <React.Fragment>
      <NavBar />
      <Grid container>
        <Grid item xs={2}>
          <div className="filters"></div>
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            alignContent="center"
            justifyContent="center"
            style={{ paddingTop: "50px" }}
            gap={2}
          >
            {/*productList.length !== 0 ? (
              productList.slice(pagination.from, pagination.to).map((item) => {
                return (
                  <Grid item key={item.id}>
                    <ProductCard item={item} />
                  </Grid>
                );
              })
            ) : (
              <Grid container direction="column" alignContent="center">
                <img src={not_found_pic} />
              </Grid>
            )*/}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AdminPage;
