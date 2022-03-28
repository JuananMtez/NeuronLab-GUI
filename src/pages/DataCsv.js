import { useState } from "react"
import Sidebar from "../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { Container, Box, Button, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import PreproccesingCSV from "../components/DataCSV/PreproccesingCSV"
import TrainingForm from "../components/Training/TrainingForm"
import TableOwnTraining from "../components/Training/TableOwnTraining"
import TableOwnFeatureExtraction from "../components/FeatureExtraction/TableOwnFeatureExtraction"

const DataCsv = () => {

  const { state } = useLocation()
  const [init, setInit] = useState(state.sidebar)
  const { csv, experiment_id } = state
  const [show, setShow] = useState({showTraining: false, showPrediction: false})
  const navigate = useNavigate()

  const handleClickBack = () => navigate('/experiment/data', { state: {id: experiment_id, sidebar: state.sidebar}})
  
  const handleClickTraining = () => {
    if (show.showTraining)
      setShow({...show, showTraining: false})
    else 
      setShow({showTraining: true, showPrediction: false})
  }

  const handleClickPrediction= () => {
    if (show.showPrediction)
      setShow({...show, showPrediction: false})
    else 
      setShow({showPrediction: true, showTraining: false})
  }

  const getComponent = () => {
    if (show.showTraining === true)
    return (
      <TrainingForm csv={csv} />

    )

    else if (show.showPrediction === true)
        return (
          <p>prediction</p>
        )

    else return
  }


  return (
    <Sidebar init={init} pos='2' tab={'CSV'} handleSidebar={setInit}>
    <Button
      onClick={handleClickBack}
      size="small"
      variant="contained"
    >
      Back
    </Button>
      <Container maxWidth="lg">

        <Box
          sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <PreproccesingCSV csv={csv} experiment={experiment_id} sidebar={init}/>
          {csv.type !== 'original' &&

  

            <Grid container spacing={2} sx={{mt:'3vh'}}>
              <Grid item xs={12}>
                <h2 style={{color:'white'}}>Feature Extractions</h2>
              </Grid>
              <Grid item xs={12}>
                <TableOwnFeatureExtraction csv={csv.id}/>
              </Grid>
              <Grid item xs={12} sx={{mt:'3vh'}}>
                <h2 style={{color:'white'}}>Classification</h2>
              </Grid>
              <Grid item xs={12}>
                <h3 style={{color: 'white'}}>Models generated</h3>
              </Grid>
              <Grid item xs={12} sx={{mb:'8vh'}}>
                <TableOwnTraining csv={csv.id}/>
              </Grid>
              <Grid item xs={12}>

              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleClickTraining}
                  color={show.showTraining === true ? "error" : "primary"}
                >
                  {show.showTraining === true ? "Hide Training" : "Training"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleClickPrediction}
                  color={show.showPrediction === true ? "error" : "primary"}

                >
                  {show.showPrediction === true ? "Hide Prediction" : "Prediction"}
                </Button>
              </Grid>
              <Grid item xs={12} sx={{mt:'4vh'}}>
                {getComponent()}
              </Grid>
            </Grid>
          }

       </Box>

      </Container>
    </Sidebar>

  )
}
export default DataCsv