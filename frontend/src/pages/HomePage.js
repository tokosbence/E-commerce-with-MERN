import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import not_found_pic from "../img/not_found.png";
import Pagination from "@mui/material/Pagination";
import "../App.css";

import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import SearchComponent from "../filterComponents/SearchComponent";
import SortComponent from "../filterComponents/SortComponent";
import CategoryComponent from "../filterComponents/CategoryComponent";
import PriceRangeComponent from "../filterComponents/PriceRangeComponent";
import BrandListComponent from "../filterComponents/BrandListComponent";

const pageSize = 10;

const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [originalBrandList, setOriginalBrandList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPriceDinamic, setMinPriceDinamic] = useState(0);
  const [maxPriceDinamic, setMaxPriceDinamic] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [category, setCategory] = useState("all");
  const [sortValue, setSortValue] = useState("Select value");
  const [allbrandList, setAllBrandList] = useState([]);

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

  useEffect(() => {}, [priceRange, allbrandList, minPrice, maxPrice]);

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
      setMinPrice(min);
      setMaxPrice(max);
      setMinPriceDinamic(min);
      setMaxPriceDinamic(max);
      setPriceRange([min, max]);

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

  //SORT BY PRICE WITH PRICE RANGE
  const sortByPrice = (priceRange) => {
    console.log("ALL PRODUCT:", productList);
    let sortData = [];
    if (category === "all") {
      console.log("ALl data");
      sortData = originalData.filter(
        (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
      );
    } else {
      console.log("ALl product");
      sortData = productList.filter(
        (item) =>
          item.price >= priceRange[0] &&
          item.price <= priceRange[1] &&
          item.category === category
      );
    }

    setProductList(sortData);
  };

  //SORT PRODUCT LIST BY BRAND
  const sortByBrand = () => {
    const filteredBrand = allbrandList.filter((item) => item.checked === true);
    let allFilteredProduct = [];

    for (let item in filteredBrand) {
      originalData.filter(function (el) {
        if (el.brand === filteredBrand[item].value) {
          allFilteredProduct.push(el);
        }
      });
    }

    if (filteredBrand.length === 0) {
      setProductList(originalData);
    } else {
      setProductList(allFilteredProduct);
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

  //HANDLE PRICE RANGE
  const handlePriceRange = (event, newValue) => {
    setPriceRange(newValue);
    setMinPriceDinamic(newValue[0]);
    setMaxPriceDinamic(newValue[1]);
    sortByPrice(newValue);
  };

  //HANDLE MIN PRICE INPUT
  const handleMinPrice = (event) => {
    setMinPriceDinamic(parseInt(event.target.value));
    setPriceRange([parseInt(event.target.value), maxPriceDinamic]);
    sortByPrice([parseInt(event.target.value), maxPriceDinamic]);
  };

  //HANDLE MAX PRICE INPUT
  const handleMaxPrice = (event) => {
    setMaxPriceDinamic(parseInt(event.target.value));
    setPriceRange([minPriceDinamic, parseInt(event.target.value)]);
    sortByPrice([minPriceDinamic, parseInt(event.target.value)]);
  };

  //CLEAR ALL FILTERS
  const handleClearFilters = () => {
    setSearchValue("");
    setCategory("all");
    setSortValue("Select value");
    setMinPriceDinamic(minPrice);
    setMaxPriceDinamic(maxPrice);
    setPriceRange([minPrice, maxPrice]);
    sortByPrice(priceRange);

    originalBrandList.map((item) => {
      if (item.checked === true) {
        item.checked = false;
      }
    });

    setAllBrandList(originalBrandList);
    setProductList(originalData);
  };

  //HANDLE BRAND
  const handleChanges = (index) => {
    const curr = allbrandList;
    curr[index].checked = !curr[index].checked;
    sortByBrand(curr);
    setAllBrandList([...curr]);
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
              <Grid item>
                <PriceRangeComponent
                  minPriceDinamic={minPriceDinamic}
                  maxPriceDinamic={maxPriceDinamic}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  priceRange={priceRange}
                  handleMaxPrice={handleMaxPrice}
                  handleMinPrice={handleMinPrice}
                  handlePriceRange={handlePriceRange}
                />
              </Grid>
            </Grid>
            <div>
              <BrandListComponent
                allbrandList={allbrandList}
                onChange={handleChanges}
              />
            </div>
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

export default HomePage;
