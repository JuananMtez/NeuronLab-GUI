import { Button, Grid } from "@mui/material"
import FilterTable from "../CSV/FilterTable"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const PreproccesingCSV = ({ csv, experiment, sidebar }) => {

   const [preproccesings, setPreproccessing] = useState([])
   const navigate = useNavigate()
  
  useEffect(() => {
    let isMounted = true
  
    if (isMounted && csv.id !== undefined) {
      axios.get(`http://localhost:8000/csv/${csv.id}/preproccessing`)
      .then(response => {
        setPreproccessing(response.data)
      })

    }
    return () => { isMounted = false };
    
  }, [csv.id])

  const handleClickBtnICA = () => {
    navigate('/csv/ica', { state: {csv: csv , sidebar:sidebar, experiment: experiment}})
  }
  

  return (
      <>
    <Grid item xs={12} sx={{mt:'2vh '}}>
      <h2 style={{color: 'white'}}>Preproccessing</h2>
    </Grid>
    <Grid item xs={12}>
      <FilterTable
        preproccesings={preproccesings}
      />
    </ Grid>
    <Grid item xs={12} sx={{mt:'3vh', mb:'3vh'}}>
  <Button
    color="secondary"
    variant="contained"
    size="medium"
    disabled={csv.type === 'feature' || csv.type === 'prep | feature'}
    onClick={handleClickBtnICA}>
      Go to ICA
    </Button>
</Grid>
      
</>
    

      
  )

} 

export default PreproccesingCSV