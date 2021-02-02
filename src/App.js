import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Radium,{styleRoot} from'radium';
import Mobile from "../src/Components/Mobile/Mobile";
 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
    paddingTop: "20px"
  },
  mobile:{
    margin: 15,
    color: "black", 
    backgroundColor:"#bd02020d",
    paddingTop:"100px",
    paddingBottom:"100px"
  },
  title:{
    [theme.breakpoints.down('xs')]: {
      fontSize:"1.4rem",
    },
  }
}));

 const App =()=> {
  const classes = useStyles();
  const [showHeader,setShowHeader] = useState(true);
  const [paddingTop,setPaddingTop] = useState();

  


  return (
   <styleRoot>
    <div className={classes.root}>
      <Grid container className={classes.header}>
      {showHeader ? <Grid item xs={12}>
        <h1 className={classes.title}> Find Best Mobile for your budget</h1>
        </Grid> :"" }
        <Grid item xs={12} className={classes.mobile} style={{paddingTop:paddingTop,paddingBottom:paddingTop}}>
        <Mobile setShowHeader = {setShowHeader} setPaddingTop={setPaddingTop}/>
        </Grid>
      </Grid>
    </div>
    </styleRoot>
  );
}
 
export default Radium(App);