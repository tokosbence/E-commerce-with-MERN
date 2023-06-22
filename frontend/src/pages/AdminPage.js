import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import not_found_pic from "../img/not_found.png";

//other components
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import SearchComponent from "../filterComponents/SearchComponent";
import SortComponent from "../filterComponents/SortComponent";
import CategoryComponent from "../filterComponents/CategoryComponent";

const pageSize = 12;

const AdminPage = () => {
  const [productList, setProductList] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [category, setCategory] = useState("all");
  const [sortValue, setSortValue] = useState("Select value");
  const [allbrandList, setAllBrandList] = useState([]);
  const [originalBrandList, setOriginalBrandList] = useState([]);

  //Pagination
  const [pagination, setPagination] = useState({
    count: 100,
    from: 0,
    to: pageSize,
  });

  //Pagination
  const handlePagination = (event, page) => {
    console.log(page);
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  useEffect(() => {
    setPagination({ ...pagination, count: productList.length });
  }, [pagination.from, pagination.to, productList, pagination.count]);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {}, [priceRange, allbrandList]);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setProductList(response.data);
      setOriginalData(response.data);

      let min = Math.min.apply(
        Math,
        response.data.map(function (val) {
          return val.price;
        })
      );
      let max = Math.max.apply(
        Math,
        response.data.map(function (val) {
          return val.price;
        })
      );

      let brand_array = response.data.map(function (item) {
        return item.brand;
      });

      let uniqbrandlist = uniqueArray1(brand_array);
      let uniqChecklist = [];
      uniqbrandlist.map((item) => {
        let object = {
          value: item,
          checked: false,
        };
        uniqChecklist.push(object);
      });
      setOriginalBrandList(uniqChecklist);
      setAllBrandList(uniqChecklist);

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  function uniqueArray1(ar) {
    var j = {};
    ar.forEach(function (v) {
      j[v + "::" + typeof v] = v;
    });

    return Object.keys(j).map(function (v) {
      return j[v];
    });
  }

  //Simple search
  const handleSearch = (value) => {
    if (value === "") {
      setSearchValue("");
      setProductList(originalData);
    } else {
      setSearchValue(value);
      setProductList(
        originalData.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  //HANDLE GENERAL SORT BY PRICE, PRICE DISCOUNT AND RATING
  const handleSort = (value) => {
    let arrayForSort = [...productList];

    setSortValue(value);
    if (value === "ascendingprice") {
      const asc = arrayForSort.sort((a, b) => {
        return a.price - b.price;
      });
      setProductList(asc);
    } else if (value === "descendingprice") {
      const desc = arrayForSort.sort((a, b) => {
        return b.price - a.price;
      });
      setProductList(desc);
    } else if (value === "ascendingrating") {
      const asc = arrayForSort.sort((a, b) => {
        return a.rating - b.rating;
      });
      setProductList(asc);
    } else if (value === "descendingrating") {
      const desc = arrayForSort.sort((a, b) => {
        return b.rating - a.rating;
      });
      setProductList(desc);
    } else if (value === "ascpricediscount") {
      const asc = arrayForSort.sort((a, b) => {
        return a.discountPercentage - b.discountPercentage;
      });
      setProductList(asc);
    } else if (value === "descpricediscount") {
      const desc = arrayForSort.sort((a, b) => {
        return b.discountPercentage - a.discountPercentage;
      });
      setProductList(desc);
    } else {
      setProductList(originalData);
    }
  };

  //SORT BY CATEGORIES
  const handleCatChange = (value) => {
    setCategory(value);
    const catList = originalData.filter((item) => item.category === value);
    if (value === "all") {
      setProductList(originalData);
      let brand_array = originalData.map(function (item) {
        return item.brand;
      });

      let uniqbrandlist = uniqueArray1(brand_array);
      let uniqChecklist = [];
      uniqbrandlist.map((item) => {
        let object = {
          value: item,
          checked: false,
        };
        uniqChecklist.push(object);
      });
      setAllBrandList(uniqChecklist);
    } else {
      setProductList(catList);

      let brand_array = catList.map(function (item) {
        return item.brand;
      });

      let uniqbrandlist = uniqueArray1(brand_array);
      let uniqChecklist = [];
      uniqbrandlist.map((item) => {
        let object = {
          value: item,
          checked: false,
        };
        uniqChecklist.push(object);
      });
      setAllBrandList(uniqChecklist);
    }
  };

  //CLEAR ALL FILTERS
  const handleClearFilters = () => {
    setSearchValue("");
    setCategory("all");
    setSortValue("Select value");

    originalBrandList.map((item) => {
      if (item.checked === true) {
        item.checked = false;
      }
    });

    setAllBrandList(originalBrandList);
    setProductList(originalData);
  };

  return (
    <React.Fragment>
      <NavBar />
      <Grid container>
        <Grid item xs={2}>
          <div className="filters">
            <Grid container direction="column">
              <Grid item>
                <Button variant="contained" onClick={handleClearFilters}>
                  Clear filters
                </Button>
              </Grid>
              <Grid item>
                <SearchComponent
                  onChange={handleSearch}
                  searchValue={searchValue}
                />
              </Grid>
              <Grid item>
                <SortComponent onChange={handleSort} sortValue={sortValue} />
              </Grid>
              <Grid item>
                <CategoryComponent
                  onChange={handleCatChange}
                  categoryValue={category}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="products">
            <Grid container gap={2}>
              {productList.length !== 0 ? (
                productList
                  .slice(pagination.from, pagination.to)
                  .map((product) => {
                    return (
                      <Grid item key={product._id}>
                        <ProductCard
                          key={product._id}
                          product={product}
                          getProduct={() => getProduct()}
                        />
                      </Grid>
                    );
                  })
              ) : (
                <Grid container direction="column" alignContent="center">
                  <img src={not_found_pic} />
                </Grid>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs>
          <Pagination
            count={Math.ceil(pagination.count / pageSize)}
            color="primary"
            onChange={(e, value) => handlePagination(e, value)}
          />
        </Grid>
      </Grid>
      <br />
    </React.Fragment>
  );
};

export default AdminPage;
