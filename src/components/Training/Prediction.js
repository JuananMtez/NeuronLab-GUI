import { Grid } from "@mui/material";
import Table from '../Table/Table';
import { useEffect, useState } from "react"
import axios from "axios";
import { LoadingButton } from "@mui/lab";


const Prediction = ({ csv }) => {

  const [loading, setLoading] = useState(true)
  const [loadingPredict, setLoadingPredict] = useState(false)
  const [data, setData] = useState([])
  const [text, setText] = useState({})

  useEffect(() => {
    let isMounted = true
    if (isMounted && csv !== undefined) {
      axios.get(`http://localhost:8000/training/models/csv/${csv.id}`)
      .then(response => {
        setData(response.data)
        setLoading(false)
      })

    }
    return () => { isMounted = false };
    
  }, [csv])


  const PredictBtn = (params) => {
    return (
      <LoadingButton
      size="small"
      loading={loadingPredict}
      variant="contained"
      color="secondary"
      onClick={e => {
        e.stopPropagation() 
        setLoadingPredict(true)
        setText({})
        axios.get(`http://localhost:8000/training/${params.id}/predict/csv/${csv.id}`)
        .then(response => {
          console.log(response.data)
          setText(response.data)
        })
        .catch(error => window.alert(error.response.data.detail))
        .finally(() =>setLoadingPredict(false))
        
      }}

      >
        Predict
      </LoadingButton>
    )
  }




  const columns = [
  
    { field: 'name', headerName: 'Name', width: 250, headerAlign: 'center', sortable: false},
    { field: 'description', headerName: 'Description', width: 600, headerAlign: 'center', sortable: false},
    { field: 'training_data', headerName: 'Training Data', width: 150, headerAlign: 'center', sortable: false},

    {
      width: 150,
      headerName: '',
      field: 'predict',
      renderCell: PredictBtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
  ]

  return (
    <Grid container>
      <Grid item xs={12} sx={{mb:'3vh'}}>
        <h2 style={{color:'white'}}>Models selectables</h2>
      </Grid>
      <Grid item xs={12}>
        <Table columns={columns} rows={data !== undefined ? data : []} loading={loading} height='29vh' rowPerPage={3}/>
      </Grid>
    
      <Grid item xs={12} sx={{mt:'3vh'}}>
        <textarea value={text === undefined ? '' : text.text } name="Text1" style={{width:'100%', fontSize: '17px', fontWeight:'bold', color:'white', outline:'none', resize:'none', backgroundColor: 'transparent', border:'none'}} rows={text === undefined ? 1 : text.n_jumps}></textarea>

      </Grid>
        

      

    </Grid>  
    )
}

export default Prediction