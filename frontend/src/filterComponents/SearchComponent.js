import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

const SearchComponent = (props) => {
  const getSearchQuery = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      sx={{ m: 1, minWidth: 220 }}
      size="small"
      onChange={getSearchQuery}
      value={props.searchValue || ""}
    />
  );
};

export default SearchComponent;
