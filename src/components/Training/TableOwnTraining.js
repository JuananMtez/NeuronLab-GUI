import { useEffect, useState, memo } from "react"
import axios from "axios"
import Table from '../Table/Table';
import { DeleteSharp } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Grid } from "@mui/material";
import ReloadButton from "../ReloadButton/ReloadButton";


const TableOwnTraining = memo(({csv}) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    if (isMounted && csv !== undefined) {
      axios.get(`http://localhost:8000/training/csv/${csv}`)
      .then(response => {
        setData(response.data)
        setLoading(false)
      })

    }
    return () => { isMounted = false };
    
  }, [csv])

  const DeleteBtn = (params) => {
    return (
      <IconButton 
      onClick={e => {
        e.stopPropagation() 
        axios.delete(`http://localhost:8000/training/${params.id}`)
        .then(response => {
          let model = data.find(m => m.id = params.id)
          setData(data.filter(d => model.id !== d.id))

        })
      }}
    >
      <DeleteSharp sx={{color:'white', fontSize:'2.5rem'}}/>
    </IconButton>
    )
  }

  const handleReload = () => {
    axios.get(`http://localhost:8000/training/csv/${csv}`)
    .then(response => {
      setData(response.data)
    })

  }

  const columns = [
  

    { field: 'name', headerName: 'Name', width: 250, headerAlign: 'center', sortable: false},
    { field: 'description', headerName: 'Description', width: 600, headerAlign: 'center', sortable: false},
    { field: 'training_data', headerName: 'Training Data', width: 150, headerAlign: 'center', sortable: false},

    {
      width: 125,
      headerName: 'Delete',
      field: 'delete',
      renderCell: DeleteBtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
  ]


  return (
    <Grid container>
      <Grid item xs={12}>
        <Table columns={columns} rows={data !== undefined ? data : []} loading={loading} height='29vh' rowPerPage={3}/>
      </Grid>
      <Grid item xs={12} sx={{mt:'2vh'}}>
       <ReloadButton
          handleReloadClick={handleReload}
        />
      </Grid>

    </Grid>

  )


})
export default TableOwnTraining