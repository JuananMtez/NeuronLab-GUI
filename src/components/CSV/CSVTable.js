import Table from '../Table/Table';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DialogStyled from '../Dialog/DialogStyled'
import axios from 'axios';
import { DeleteSharp } from '@mui/icons-material';

const CSVTable = ({ data, handleData }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('')
  const [idCSV, setIdCSV] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setName('')
    setIdCSV('')
  }


  const createCopy = () => {
    axios.post(`http://localhost:8000/csv/${idCSV}`, {name: name})
    .then(response => {
      let a = [...data.csvs]
      a.push(response.data)
      handleData({
        ...data,
        csvs: a
      })
      setOpen(false)

    })
  }
 
  const handleName = (e) => setName(e.target.value)


  const DeleteBtn = (params) => {

    let csv = data.csvs.find(c => c.id === params.id)
    if (csv.original)
      return (
        
        <IconButton sx={{visibility:'hidden'}}>
          <ContentCopyIcon sx={{color:'white', fontSize:'2.5rem'}}/>
        </IconButton>
      )
    else 
        
      return (
        <IconButton 
        onClick={e => {
          e.stopPropagation() 
          axios.delete(`http://localhost:8000/csv/${params.id}`)
          .then(response => {
            handleData({
              ...data,
              csvs: data.csvs.filter(c => c.id !== params.id)
            })

          })
        }}
      >
        <DeleteSharp sx={{color:'white', fontSize:'2.5rem'}}/>
      </IconButton>
      )
  }

  const CopyBtn = (params) => {
    return (
      <IconButton 
        onClick={e => {
          e.stopPropagation()
          setIdCSV(params.id)        

          handleOpen()
        }}
      >
        <ContentCopyIcon sx={{color:'white', fontSize:'2.5rem'}}/>
      </IconButton>
  
    )
  }

  const columns = [
  
    { field: 'name', headerName: 'Name', width: 200, headerAlign: 'center', sortable: false},
    { field: 'subject_name', headerName: 'Subject', width: 200, headerAlign: 'center', sortable: false},
    { field: 'original', headerName: 'Original', width: 200, headerAlign: 'center', sortable: false},
    {
      width: 150,
      headerName: 'Copy',
      field: 'copy',
      renderCell: CopyBtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
    {
      width: 150,
      headerName: 'Delete',
      field: 'delete',
      renderCell: DeleteBtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
  ];


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DialogStyled
          open={open}
          handleClose={handleClose}
          text={name}
          handleText={handleName}
          handleSend={createCopy}
        />
      </Grid>
    <Grid item xs={12}>
      <Table columns={columns} rows={data.csvs === undefined ? [] : data.csvs} loading={false} showCheck={true} height='70vh' rowPerPage={10}/>
    </Grid>
  </Grid>

  )
}
export default CSVTable