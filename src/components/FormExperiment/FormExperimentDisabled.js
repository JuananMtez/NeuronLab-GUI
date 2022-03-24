import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid';
import  Container  from "@mui/material/Container"
import TextFieldStyled from "../TextFieldStyled/TextFieldStyled";
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";
import { useState } from "react";
import FormInfoExperiment from './FormInfoExperiment'
import CSVTable from "../CSV/CSVTable";
import ReloadButton from "../ReloadButton/ReloadButton"
import axios from "axios";
import FormPreproccessing from "../Preproccessing/FormPreproccessing";
import FormFeatureExtraction from "../FeatureExtraction/FormFeatureExtraction";


const FormExperimentDisabled = ({ data, researchers, handleResearchers, handleExperiments, subjects, handleSubjects, init }) => {
  const [showInfo, setInfo] = useState(false)
  const [csvSelected, setCsvSelected] = useState([])

  const [form, setForm] = useState({showProccessing: false, showFeatureExtraction: false})

  const handleReload = () => {
    axios.get(`http://localhost:8000/csv/${data.id}`)
    .then(response => {
      handleExperiments({
        ...data,
        csvs: response.data
        
      })
    })

  }

  const getForm = () => {
    if(form.showProccessing)
      return (
        <FormPreproccessing csvs={csvSelected}/>
      )
    else if (form.showFeatureExtraction)
    return (
      <FormFeatureExtraction csvs={csvSelected}/>
    )
  }
  const handleShowPreproccessing = () => {
    if (form.showProccessing) {
      setForm({
        ...form,
        showProccessing: false
      })
    } else {
      setForm({
        showProccessing: true,
        showFeatureExtraction: false
      })
    }
  }

  const handleShowFeatureExtraction = () => {
    if (form.showFeatureExtraction) {
      setForm({
        ...form,
        showFeatureExtraction: false
      })
    } else {
      setForm({
        showProccessing: false,
        showFeatureExtraction: true
      })
    }
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
              size="small"
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
              rowsSelected={setCsvSelected}
            />
          </Grid>
          <Grid item xs={12}>
            <ReloadButton 
              handleReloadClick={handleReload}
            />
          </Grid>
          <Grid item xs={12} sx={{mt:'4vh'}}>
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained"
                color={form.showProccessing ? 'error': 'info'}
                onClick={handleShowPreproccessing}
                size="small"

              >
                {form.showProccessing ? 'Hide form Preproccessing' : 'Form Preproccessing'}
              </Button>
              <Button 
                variant="contained"
                color={form.showFeatureExtraction  ? 'error': 'secondary'}
                size="small"
                onClick={handleShowFeatureExtraction}
              >
                {form.showFeatureExtraction ? 'Hide Info' : 'Show Info'}
              </Button>
            </Stack>


          </Grid>
          <Grid item xs={12} sx={{mt:'5vh'}}>
            {getForm()}
          </Grid>
        </Grid>

      </Box>
    </Container>
    
  )
}
export default FormExperimentDisabled