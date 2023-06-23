import React from "react";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

const BrandListComponent = (props) => {
  const allbrandList = props.allbrandList;

  const handleChanges = (index) => {
    props.onChange(index);
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          paddingTop: "1rem",
          paddingLeft: "1rem",
          width: 220,
          height: 500,
          overflow: "scroll",
        }}
      >
        <Grid container direction="column">
          {allbrandList.map((item, index) => {
            return (
              <Grid item key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.checked}
                      onChange={() => {
                        handleChanges(index);
                      }}
                      value={item.value}
                    />
                  }
                  label={item.value}
                />
              </Grid>
            );
          })}
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default BrandListComponent;
