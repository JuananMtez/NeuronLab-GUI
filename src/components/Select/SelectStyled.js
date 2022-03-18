import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
;


const SelectStyled = styled(Select)({
   
  color:'white',
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#7ed957',
  },
  '& .MuiInputLabel-root':{
    color:'red,'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#7ed957',
  },
  '& .MuiOutlinedInput-notchedOutline:after': {
    borderColor: '#7ed957',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#7ed957',
  },
  "&:hover .MuiInputLabel-root": {
    color: "red"
  },
  
  });

export default SelectStyled;