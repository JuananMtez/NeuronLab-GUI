import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid';
import TextFieldDisabled from '../TextFieldDisabled/TextFieldDisabled'
import  Container  from "@mui/material/Container"
import Chip from '@mui/material/Chip';
import BackButton from "../BackButton/BackButton";


const FormSubjectDisabled = ({ data }) => {
  
  
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
          <TextFieldDisabled 
          fullWidth
          
          value={data.name}
          name="name"
          label="Name"/>
        </Grid>
        <Grid item xs={6}>
          <TextFieldDisabled 
            fullWidth
            value={data.surname}
            name="surname"
            label="Surname"
          />
        
        </Grid>
        <Grid item xs={12}>
          <TextFieldDisabled
            fullWidth
            name="age"
            label="Age"
            value={data.age}
          />
        
        </Grid>
        <Grid item xs={12}>
          <h2 style={{color:'white'}}>Mental Conditions</h2>
        </Grid>
        {data.mental_conditions.map((e, index) => (
          <Grid item xs={4} key={index}>
            
            <Chip
              label={e.condition}
              key={index}
              sx={{color:'white'}}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
    <BackButton url="../subjects"/>
    </Container>
    
  )
    
}

export default FormSubjectDisabled