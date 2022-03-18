import Sidebar from "../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import TableEEG from "../components/RecordEEG/TableEEG";
import { Container, fabClasses, Grid } from "@mui/material";
import BackButtonFixed from "../components/BackButton/BackButtonFixed";
import { Button } from "@mui/material";


import PairButton from "../components/RecordEEG/PairButton";

const RecordEEG = () => {
  
  const { state } = useLocation()

  const [status, setStatus] = useState({play: false, loading: false, pair: false})

  const handleStart = () => {
    setStatus({
      ...status,
      play: true
    })
    window.lsl.start()

  }

  const handleStop = () => {
    setStatus({
      ...status,
      play: false
    })
    window.lsl.stop()


  }

  const handlePairBtn= () => {
    setStatus({
      ...status,
      loading: true,
      play: false
    })
    window.lsl.searchStreams(state.experiment.device.channels_count, state.experiment.device.sample_rate)
    .then(e => {
      setStatus({
        pair: e,
        loading: false,
        play: false
      })

    })
  }

  const handleUnpairBtn= () => {
    window.lsl.closeStream()
    setStatus({
      pair: false,
      loading: false,
      play: false
    })
    

  }


  return (
    <Sidebar init={false} pos='2' tab={'Record EEG'} handleSidebar={() => {}}>
      <Container maxWidth="xl">

      <Grid container spacing={2}>
      
        <Grid item xs={12}>
          <TableEEG device={state.experiment.device} play={status.play} pair={status.pair}/>
        </Grid>
      

        <Grid item xs={12}>
          <PairButton status={status} handlePairBtn={handlePairBtn} handleUnpairBtn={handleUnpairBtn}/>
        </Grid>
        <Grid item xs={12} sx={{ml:2}}>
          {
            !status.play || !status.pair
            ?
            <Button
              onClick={handleStart}
              variant="contained"
              disabled={!status.pair}
              color="success"
              fullWidth
           >
            Start data stream
          </Button>
          :
          <Button
          onClick={handleStop}
          variant="contained"
          color="error"
          fullWidth
        >
          Stop data stream
        </Button>
          }
         
        </Grid>

        <Grid item xs={12}>
          <Grid 
          container 
          direction="row-reverse"
          justifyContent="flex-start"
          alignItems="center"
          >

          <BackButtonFixed disabled={status.play} url="/experiment/data" metadata={state.experiment.id} init={false} fixed={false}/>
        </Grid>
        </Grid>
      </Grid>
    



      </Container>
    </Sidebar>
  )
}

export default RecordEEG