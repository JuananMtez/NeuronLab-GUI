import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid';
import TextFieldStyled from '../TextFieldStyled/TextFieldStyled'
import { Button } from "@mui/material";
import  Container  from "@mui/material/Container"
import Chip from '@mui/material/Chip';
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { useState } from "react";
import BackButton from "../BackButton/BackButton";

const FormSubject = () => {
  const [value, setValue] = useState({name: '', surname: '', age: '', mental_conditions: []})
  const [condition, setCondition] = useState('')
  const navigate = useNavigate()
  let disabled = !(value.name !== '' && value.surname !== '' && value.age !== '' && value.mental_conditions.length > 0)
 

  const handleChange = (e) => {
    if (e.target.name === 'mentalCondition')
      setCondition(e.target.value)
    else
      setValue({
        ...value,
        [e.target.name]: e.target.value
      })

  }


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const c = {condition: condition}
      let list = [...value.mental_conditions]
      list.push(c)
      setValue({
        ...value,
        mental_conditions: list
      })
      setCondition('')
    }
  }

  const handleDelete = (e, v) => {
    e.preventDefault()
    let list = [...value.mental_conditions]    
    
    
    setValue({
      ...value,
      mental_conditions: list.filter(c => c.condition !== v)
    })
  }

  const handleSubmit = () => {

    axios.post('http://127.0.0.1:8000/subject/', value)
    .then(response => navigate('../subjects'))
  
  }
  
  return ( 
    <Container maxWidth="lg">
      <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextFieldStyled 
          fullWidth
          required
          value={value.name}
          onChange={handleChange}
          name="name"
          label="Name"/>
        </Grid>
        <Grid item xs={6}>
          <TextFieldStyled 
            fullWidth
            required
            value={value.surname}
            onChange={handleChange}
            name="surname"
            label="Surname"
          />
        
        </Grid>
        <Grid item xs={12}>
          <TextFieldStyled 
            fullWidth
            required
            name="age"
            label="Age"
            value={value.age}
            onChange={handleChange}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        
        </Grid>
        <Grid item xs={12}>
          <TextFieldStyled
            required
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={condition}
            name="mentalCondition"
            label="Mental Conditions"
            fullWidth        
          />

        </Grid>
      </Grid>
      {value.mental_conditions.length === 0 &&
        <p style={{color: "#c9382b", fontSize:'20px'}}>* Press enter to add a mental condition</p>
      }
      
      <Grid container spacing={1} sx={{mt:3}}>
        {value.mental_conditions.map((e, index) => (
          <Grid item xs={2} key={index}>
            
            <Chip
              label={e.condition}
              onDelete={ev => handleDelete(ev, e.condition)}
              key={index}
              sx={{color:'white'}}
      />
          </Grid>
        ))}

      </Grid>

      
      <Button
        size="large"
        type="submit"
        fullWidth
        disabled={disabled}
        onClick={handleSubmit}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add
      </Button>
    </Box>
    <BackButton url="../subjects"/>
    </Container>
    
  )
    
}

export default FormSubject