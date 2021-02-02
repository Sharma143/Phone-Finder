import axios from "axios";


export const fetchOptionsData = async() =>{
    try{
  const {data } = await axios.get("http://localhost:5000/options");
  return data;
    }catch(error){
    }
}

export const fetchMobileData = async() =>{
    try{
  const {data } = await axios.get("http://localhost:5000/mobiles");
  return data;
  console.log(data)
    }catch(error){
    }
}

export const fetchPurposeData = async() =>{
    try{
  const {data} = await axios.get("http://localhost:5000/budgets");
// return data.map(option=>option.name);
return data;
    }catch(error){
    }
}