import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Logo from '../components/Logo/Logo'
import FormLogin from '../components/FormLogin/FormLogin'
import { useEffect } from 'react';


export default function Login() {

  useEffect(() => {
    localStorage.removeItem("user");
  }, [])

  return (
      
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10vh',
          }}
        >

          <Logo/>
          <FormLogin />            

        </Box>
      </Container>
  );
}