import React,{useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import {fetchPurposeData} from "../../api/index"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


 function MultipleSelect({setMobileSpec}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [fetchedPurpose, setFetchedPurpose] = React.useState([]);
  const [personName, setPersonName] = React.useState([]);
  const[disabled,setDisabled] = React.useState(false);
  useEffect(()=>{
    const fetchPurpose = async () =>{
      setFetchedPurpose(await fetchPurposeData())
    }
    fetchPurpose();
    console.log(fetchedPurpose,"fetchedPurpose")
    },[setFetchedPurpose])

  const handleChange = (event) => {
    setPersonName(event.target.value);
    if(event.target.value.length >=2 ){
      setMobileSpec(true);
    }else{
      setMobileSpec(false);
    }
  };
 

  return (
    <div>
    <FormControl className={classes.formControl}>
        <Select
         open={open}
         onOpen={()=> setOpen(true)}
         onClose = {()=>setOpen(false)}
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip}/>
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {fetchedPurpose.map((data) => (
            <MenuItem key={data.name} value={data.value} disabled={disabled}>
              <Checkbox checked={personName.indexOf(data.value) > -1}/>
              <ListItemText primary={data.name}/>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelect