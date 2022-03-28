import TextFieldStyled from '../TextFieldStyled/TextFieldStyled'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import "./FormLogin.css"

const FormLogin = () => {

  let navigate = useNavigate()
  const [value, setValue] = useState({ user: '', password: ''})
  const [showError, setShowError] = useState(false)

  let disabled = true

  
  const handleChange = (e) => {
    setValue(
      { 
        ...value,
        [e.target.name]: e.target.value })
  }

  if (value.user !== '' && value.password !== '')
    disabled = false


  const handleRegister = () => {
    navigate('../register')
  }

  const onKeyDown = (event) => {
    if (!disabled && event.key === 'Enter' )
      handleLogin()
  }

  const handleLogin = () => {
    axios.post('http://127.0.0.1:8000/researcher/login', value)
    .then(response => {
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate('../home')
    }).catch(error => {
      if (error.response.status === 404) {
        setShowError(true)
        setValue({ user: '', password: ''})
      }
    })
  }

  return (
    <Box sx={{mt:'7vh'}}>
      <TextFieldStyled 
        fullWidth 
        margin="normal" 
        label="User" 
        value={value.user}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        id="user"
        name="user"
      />
      <TextFieldStyled 
        fullWidth 
        margin="normal" 
        label="Password" 
        type="password" 
        value={value.password}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        name="password"
        id="password"
      />
      {showError && 
        <p className="textError">* User or password incorrect</p>
      }
      
      <Button
        type="submit"
        fullWidth
        size="large"
        disabled={disabled}
        onClick={handleLogin}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>

      <Box sx={{textAlign: 'center'}}>
        <Button 
          variant="text"
          onClick={handleRegister}
          
        >
          Don't have an account? Sign Up
        </Button>
      </Box>
    </Box>
          
      
  )
}

export default FormLogin;