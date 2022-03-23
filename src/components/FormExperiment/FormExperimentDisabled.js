import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid';
import  Container  from "@mui/material/Container"
import TextFieldStyled from "../TextFieldStyled/TextFieldStyled";
import Button from '@mui/material/Button';
import { useState } from "react";
import FormInfoExperiment from './FormInfoExperiment'
import CSVTable from "../CSV/CSVTable";
import ReloadButton from "../ReloadButton/ReloadButton"
import axios from "axios";


const FormExperimentDisabled = ({ data, researchers, handleResearchers, handleExperiments, subjects, handleSubjects, init }) => {
  const [showInfo, setInfo] = useState(false)

  const handleReload = () => {
    axios.get(`http://localhost:8000/csv/${data.id}`)
    .then(response => {
      handleExperiments({
        ...data,
        csvs: response.data
        
      })
    })

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
          <Grid item xs={12}>
            <TextFieldStyled
            fullWidth
            value={Object.keys(data).length === 0 ? '' : data.name}
            name="name"
            label="Name"
            InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldStyled
              fullWidth
              value={Object.keys(data).length === 0 ? '' : data.description}
              name="description"
              maxRows={4}
              
              label="Description"
              sx={{color:'white'}}
              InputLabelProps={{ shrink: true }}

            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained"
              onClick={() => setInfo(!showInfo)}
            >
              {showInfo ? 'Hide Info' : 'Show Info'}
            </Button>
  
          </Grid>
        </Grid>
        {
          showInfo && 
          <FormInfoExperiment
            data={data}
            researchers={researchers}
            handleResearchers={handleResearchers}
            handleExperiments={handleExperiments}
            subjects={subjects}
            handleSubjects={handleSubjects}
            init={init}
          />
        }
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{mt:6}}>
            <h2 style={{color: 'white'}}>CSV</h2>

          </Grid>
          <Grid item xs={12}>
            <CSVTable 
              data={data}
              handleData={handleExperiments}
              sidebar={init}
            />
          </Grid>
          <Grid item xs={12}>
            <ReloadButton 
              handleReloadClick={handleReload}
            />

          </Grid>

        </Grid>

      </Box>
    </Container>
    
  )
}
export default FormExperimentDisabled