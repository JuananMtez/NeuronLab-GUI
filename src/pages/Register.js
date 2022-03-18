import { useState } from "react"
import TextFieldStyled from '../components/TextFieldStyled/TextFieldStyled'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import BackButton from "../components/BackButton/BackButton";
import FormRegister from "../components/FormRegister/FormRegister";
import Logo from "../components/Logo/Logo";



const Register = () => {

  const [validCode, setValidCode] = useState(false)
  const [errorCode, setErrorCode] = useState(false)
  const [code, setCode] = useState('')


  const handleValidCodeBtn = () => {
    if (code === 'mixoti')
      setValidCode(true) 
    else  {
      setErrorCode(true)
      setCode('')
    }
  }

  if (!validCode) {
    return (
      <>
        <Container maxWidth="xs">
          <Box
            sx={{
              display:'flex',
              flexDirection:'column',
              alignItems: 'center',
              marginTop: '10vh'
            }}
          >
            <Logo/>

            <Box
              sx={{
                marginTop: '7vh',
                textAlign: 'center'
              }}
            >
              {errorCode
              ? 
                <TextField
                  error
                  fullWidth
                  id="outlined-basic" 
                  label="Code" 
                  value={code} 
                  type="password"
                  onChange={e => setCode(e.target.value)} 
                  variant="outlined" 
                  sx={{
                    input: {
                      color: 'white'
                    }
                  }}
                />
              :
                <TextFieldStyled
                  fullWidth
                  id="outlined-basic" 
                  label="Code" 
                  value={code} 
                  type="password"
                  onChange={e => setCode(e.target.value)} 
                  variant="outlined" 
                />
              }

              <Button 
                sx={{
                  mt: '3vh',
                }}
                variant="contained" 
                onClick={handleValidCodeBtn}
              >
                Validate
              </Button>   
              
            </Box>  

            
          </Box>
        </Container>
        
       
        <BackButton url="../login"/>


      </>

    )
  }

  return (

    <FormRegister />
  )

}


export default Register