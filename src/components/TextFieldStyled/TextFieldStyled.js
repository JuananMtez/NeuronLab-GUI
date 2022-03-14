import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


const TextFieldStyled = styled(TextField)({
   
    input: {
        color: 'white',

    },
    label: {
        color:'#a6a6a6',
    },
    '& label.Mui-focused': {
      color: '#7ed957',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#7ed957',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#7ed957',
      },
      '&:hover fieldset': {
        borderColor: '#7ed957',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#7ed957',
      },
      '& .MuiOutlinedInput-input': {
        color: 'white'
      }
  
    },
  });

export default TextFieldStyled;