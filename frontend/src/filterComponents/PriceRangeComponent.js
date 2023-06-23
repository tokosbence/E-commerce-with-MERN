import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";

const PriceRangeComponent = (props) => {
  return (
    <React.Fragment>
      <Stack direction="row" gap={2}>
        <TextField
          sx={{ m: 1 }}
          label="min"
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          value={props.minPriceDinamic}
          onChange={props.handleMinPrice}
        />
        <TextField
          sx={{ m: 1 }}
          label="max"
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          value={props.maxPriceDinamic}
          onChange={props.handleMaxPrice}
        />
      </Stack>

      <Slider
        sx={{ m: 1, width: 210 }}
        min={props.minPrice}
        max={props.maxPrice}
        value={props.priceRange}
        onChange={props.handlePriceRange}
        valueLabelDisplay="auto"
      />
    </React.Fragment>
  );
};

export default PriceRangeComponent;
