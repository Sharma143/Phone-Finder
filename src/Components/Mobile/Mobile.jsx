import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Typography,Select,FormControl,MenuItem, Button} from '@material-ui/core';
import Radium, {styleRoot} from'radium';
import { fetchOptionsData,fetchPurposeData,fetchMobileData } from "../../api/index"
import Paper from "@material-ui/core/Paper";
import Price from "../Price/Price";
import mob1 from "../../img/mob1.jpg"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,   
    //background:"pink",
    paddingTop:"50px",
    paddingBottom:"50px"
  },
 para:{
     fontSize : 20,
     background:"#fff",
    width:"90%",
     padding:"5px"
 },
 paper: {
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
},
imageWdth:{
  width:"100%"
},
mobContainer :{
  justifyContent:"center",width:"80%",margin:"auto"
},
specification:{
  textAlign:"start",
  color:"#000",
  margin:"auto"
},
buynow:{
  textAlign:"start",
  color:"#000",
  fontWeight:"500",
},
btnborder:{
  border:"1px solid #1edcc2",
  textAlign:"center",
  borderRadius:"16px",
  width:"50%",
  padding:"8px",
  background:"#1edcc2",
  ' &:focus': {
    outline: "none"
},
},
currentprice:{
  textAlign:"end",
  color:"#000",
  margin:"auto",
  [theme.breakpoints.down('xs')]: {
    textAlign:"start",
  },
},
filterBtn:{
  color:"#fff",
  backgroundColor : "#000",
    '&:hover': {
    backgroundColor: '#000',
},
},
rupee:{
  fontSize:"15px",
  position:"relative",
  right:"2px",
  top:"-6px"
},
}));



const Mobile = ({setShowHeader,setPaddingTop}) => {   
  const[budget, setBudget] = useState(false);
  const[mobileSpec, setMobileSpec] = useState(false);
  const [open, setOpen] = useState(true);
  const[disabled,setDisabled] = useState(true);
  const [openBg, setOpenBg] = useState(true);
  const[showMobile,setShowMobile] = useState(false);
  const [value,setValue] = useState([]);
  const classes = useStyles();
  const [fetchedOptions,setFetchedOptions] = useState([]);
  const [fetchedPurpose, setFetchedPurpose] = useState([]);
  const [selectedMobile,setSelectedMobile] = useState([]);
  const [fetchMobile,setFetchMobile] = useState([]);
  const [selectVal,setSelectVal] = useState("");
 
    useEffect(()=>{
        const fetchOption = async () =>{
            setFetchedOptions(await fetchOptionsData())
        }
        const fetchPurpose = async () =>{
          setFetchedPurpose(await fetchPurposeData())
        }
        const fetchMobile = async () =>{
          setSelectedMobile(await fetchMobileData())
        }
     fetchOption();
     fetchPurpose();
     fetchMobile();
    },[setFetchedOptions,setFetchedPurpose,setSelectedMobile]);
  const handleChange = (e) =>{
    setSelectVal(e.target.value);
    setBudget(true)
    setOpen(false)
    setShowMobile(false)
    setMobileSpec(false)
  } 

  const handleChangeBg = (e) =>{
    if(e.target.value === "low"){
      onLow();
    }
    if(e.target.value === "medium"){
      onMed();
    }
    if(e.target.value === "high"){
      onHig();
    }
    setDisabled(false);
    setOpenBg(false);
    setShowMobile(false)
    setMobileSpec(false)
  }
  const findMobile = () =>{
  setShowHeader(false)
  setPaddingTop(0)
  setShowMobile(true)
  setMobileSpec(true)
  setValue([1000,15000])
  }

  const onLow = () =>{
    setFetchMobile(selectedMobile.filter(mobile => mobile.value <=15000))
    setValue([1000,15000])
  }
  // console.log(selectedMobile)
  const onMed = () =>{
    setFetchMobile(selectedMobile.filter(mobile => mobile.value >15000 && mobile.value <=25000))
    setValue([16000,25000])
  }

  const onHig = () =>{
    setFetchMobile(selectedMobile.filter(mobile => mobile.value >25000 &&  mobile.value <= 120000))
    setValue([26000,120000])
  }
  
  

  return (
    <styleRoot>
    <div className={classes.root}> 
      <Grid container className={classes.mobContainer} >
        <Grid item xs={12} sm={4} className={classes.formBak} >
        <Typography  variant="subtitle2" gutterBottom className={classes.para}>
          Primary
            &nbsp;<span> 
      <FormControl>
        <Select
          open={open}
          //onClose={()=>setOpen(false)}
          onOpen={()=>setOpen(true)}
          value={selectVal}
          onChange={handleChange}
          style={{color:"#000"}}
        >
          {fetchedOptions.map((option,i) =><MenuItem key={i} value={option.value}>{option.name}</MenuItem>)}
        </Select>
      </FormControl>
       </span>
      </Typography>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.formBak}>
       <Typography  variant="subtitle2" gutterBottom className={classes.para}>
            Budget  
            &nbsp;<span> 
            {budget ?
        <FormControl >
           <Select
          open={openBg}
          //onClose={()=>setOpenBg(false)}
          onOpen={()=> setOpenBg(true)}
          onChange={handleChangeBg}
          style={{color:"#000"}}
        >
          {fetchedPurpose.map((option,i) =><MenuItem key={i} value={option.value}>{option.name}</MenuItem>)}
        </Select>
      </FormControl>: false}
       </span>
       </Typography>
        </Grid>
        <Grid item xs={12} sm={4} style={{textAlign:"start"}}>
         <Button onClick={findMobile} style={{color:"#fff",background:"red",padding:"9px",borderRadius:"0px",width:"94%"}} disabled={disabled}>Find</Button>
        </Grid>
        {mobileSpec ?
         <>
          <Grid item xs={12} style={{paddingTop:"5%"}}>
        <Button onClick={onLow} className={classes.filterBtn}>Low</Button>&nbsp;
        <Button onClick={onMed} className={classes.filterBtn}>Medium</Button>&nbsp;
        <Button onClick={onHig} className={classes.filterBtn}>High</Button>&nbsp;
        </Grid>
        <Grid item xs={12} style={{paddingTop:"5%",margin:"auto"}}>
        <Price value = {value} setValue={setValue}/>
        </Grid>
        </>
        : false}
        
        {showMobile?
        <>
        {fetchMobile.map(mob=>{
          return(
            <Grid item xs={12} sm={12} style={{padding:"10px"}} >
            <Paper className={classes.paper}>
              <Grid container style={{padding:"30px 10px"}}>
              <Grid item xs={12} sm={4}>
              <img src={mob1} alt="" className={classes.imageWdth}></img>
              </Grid>
              <Grid item sm={8} xs={12}>
                <Grid container>
                  <Grid item sm={8} xs={12}>
                  <h2 className={classes.specification}>
                     Mobile:{mob.name}
                  </h2>
                  <p className={classes.specification}>Best Camera Phone</p>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                  <Typography variant="h5" gutterBottom className={classes.currentprice} >
                     <span className={classes.rupee}>Rs</span>{mob.value}
                  </Typography>
                  </Grid>
                </Grid>
                <hr></hr>
                <Grid container >
                  <Grid item sm={6} xs={12}>
                  <p className={classes.specification}>{mob.spec1}</p>
                  <p className={classes.specification}>{mob.spec2}</p>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                  <p className={classes.specification}>{mob.spec1}</p>
                  <p className={classes.specification}>{mob.spec2}</p>
                  </Grid>
                </Grid>
                <Grid container >
                  <Grid item sm={12} xs={12} className={classes.buynow}>
                    <p>Buy now at</p>
                  </Grid>
                  <Grid item sm={6} xs={12} className={classes.buynow}>
                    <p>Amazon</p>
                    <button className={classes.btnborder} >Rs {mob.value}</button>
                  </Grid>
                  <Grid item sm={6} xs={12} className={classes.buynow}>
                    <p>Flipkart</p>
                    <button className={classes.btnborder}>Rs {mob.value}</button>
                  </Grid>
                </Grid>
              </Grid>
              </Grid>
            </Paper>
           </Grid>
          )
        })}
       </>
        : ""}
         </Grid>
    </div>
    </styleRoot>
  );
}

export default Radium(Mobile);