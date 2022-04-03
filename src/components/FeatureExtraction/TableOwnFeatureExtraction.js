import { useEffect, useState, memo } from "react"
import axios from "axios"
import Table from '../Table/Table';
import { Grid } from "@mui/material";


const TableOwnFeatureExtraction = memo(({csv}) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    if (isMounted && csv !== undefined) {
      axios.get(`http://localhost:8000/csv/${csv}/features`)
      .then(response => {
        setData(response.data)
        setLoading(false)
      })

    }
    return () => { isMounted = false };
    
  }, [csv])

 

  const columns = [
  

    { field: 'feature_extraction', headerName: 'Feature', width: 200, headerAlign: 'center', sortable: false},

  ]


  return (
    <Grid container>
      <Grid item xs={2.5}>
        <Table columns={columns} rows={data !== undefined ? data : []} loading={loading} height='18vh' rowPerPage={1}/>
      </Grid>


    </Grid>

  )


})
export default TableOwnFeatureExtraction