import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const sort = [
  {
    value: "Select value",
    label: "Select value",
  },
  {
    value: "descendingprice",
    label: "Descending by price",
  },
  {
    value: "ascendingprice",
    label: "Ascending by price",
  },
  {
    value: "descendingrating",
    label: "Descending by rating",
  },
  {
    value: "ascendingrating",
    label: "Ascending by rating",
  },
  {
    value: "descpricediscount",
    label: "Descending by price discount",
  },
  {
    value: "ascpricediscount",
    label: "Ascending by price discount",
  },
];

const SortComponent = (props) => {
  const handleSort = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: 220 }} size="small">
      <InputLabel id="demo-select-small">Sort</InputLabel>
      <Select
        labelId="select-sort"
        id="select-sort"
        value={props.sortValue || ""}
        label="Sort"
        onChange={handleSort}
      >
        {sort.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortComponent;
