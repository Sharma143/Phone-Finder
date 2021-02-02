import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  root: {
    width: 250,
    margin: "auto",
    // paddingTop:"50px",
    color:"black"
  },
  input: {
    width: 42
  },
 
});
function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export default function InputSlider({value,setValue}) {
  const classes = useStyles();

  const handleSliderChange = (event,newValue) => {
      setValue(newValue)
  };  

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
      <span>{value[0]}</span>
        <Grid item xs>
          <Slider
            value={value}
            ValueLabelComponent={ValueLabelComponent}
            onChange={handleSliderChange}
            aria-label="custom thumb label"
            min={value[0]}
            max={value[1]}
          /> 
        </Grid>
        <span>{value[1]}</span>
      </Grid>
    </div>
  );
}
