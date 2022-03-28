import Grid from '@mui/material/Grid';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DialogStyled from '../Dialog/DialogStyled'
import axios from 'axios';
import { DeleteSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { OpenInNewSharp } from '@mui/icons-material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DownloadIcon from '@mui/icons-material/Download';
import Table from '../Table/Table';
import TableCsvCustom from '../Table/TableCsvCustom';



const CSVTable = ({ data, handleData, sidebar, rowsSelected, showPreproccessing, showFeature }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('')
  const [openChange, setOpenChange] = useState(false)
  const [idCSV, setIdCSV] = useState('')
  const navigate = useNavigate()

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setName('')
    setIdCSV('')
  }

  const handleOpenChange = () => setOpenChange(true)
  const handleCloseChange = () => {
    setOpenChange(false)
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
      setName('')
      setIdCSV('')

    })
  }

  const DownloadBtn = (params) => {
    return (
    <IconButton 
    onClick={e => {
      e.stopPropagation()
      window.api.downloadCSV(params.id)
    }}
  >
    <DownloadIcon sx={{color:'white', fontSize:'2.5rem'}}/>
  </IconButton>
    )
  }

  const changeName = () => {
    axios.patch(`http://localhost:8000/csv/${idCSV}`, {name: name})
    .then(response => {
      let a = [...data.csvs]

      
      handleData({
        ...data,
        csvs: a.map(el => el.id === idCSV ? {...el, name:name} : el)
      })
      setOpenChange(false)
      setName('')
      setIdCSV('')

    })
  }

  const OpenBtn = (params) => {
    return (
      <IconButton 
        onClick={e => {
          e.stopPropagation()
          let csv = data.csvs.find(e => e.id === params.id)
          navigate('/csv/data', { state: {csv: csv , sidebar:sidebar, experiment_id: data.id}})
        }}
      >
        <OpenInNewSharp sx={{color:'white', fontSize:'2.5rem'}}/>
      </IconButton>
    )
  }
 
  const handleName = (e) => setName(e.target.value)


  const DeleteBtn = (params) => {

    let csv = data.csvs.find(c => c.id === params.id)
    if (csv.type === 'original')
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

  const ModifyBtn = (params) => {
    return (
      <IconButton 
        onClick={e => {
          e.stopPropagation()
          setIdCSV(params.id)        

          handleOpenChange()


        }}
      >
        <AutoFixHighIcon sx={{color:'white', fontSize:'2.5rem'}}/>
      </IconButton>
  
    )
  }
/*
  const ICABtn = (params) => {
    return (
      <IconButton 
        onClick={e => {
          e.stopPropagation()
          let csv = data.csvs.find(e => e.id === params.id)
          navigate('/csv/ica', { state: {csv: csv , sidebar:sidebar, experiment_id: data.id}})

        }}
      >
        <RemoveCircleOutlineSharpIcon sx={{color:'white', fontSize:'2.5rem'}}/>
      </IconButton>
  
    )
  }
  */

  const columns = [
  
    { field: 'name', headerName: 'Name', width: 400, headerAlign: 'center', sortable: false},
    { field: 'type', headerName: 'Type', width: 300, headerAlign: 'center', sortable: false},
    {
      width: 125,
      headerName: 'Open',
      field: 'open',
      renderCell: OpenBtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
    {
      width: 125,
      headerName: 'Modify',
      field: 'modify',
      renderCell: ModifyBtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
 /*   {
      width: 125,
      headerName: 'ICA',
      field: 'ica',
      renderCell: ICABtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
  */{
      width: 125,
      headerName: 'Download',
      field: 'download',
      renderCell: DownloadBtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
    {
      width: 125,
      headerName: 'Copy',
      field: 'copy',
      renderCell: CopyBtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
    {
      width: 125,
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
          handleClick={createCopy}
          title="Copy CSV"
          description="Type in a name for the new CSV"
        />
      </Grid>
      <Grid item xs={12}>
        <DialogStyled
          open={openChange}
          handleClose={handleCloseChange}
          text={name}
          handleText={handleName}
          handleClick={changeName}
          title="Modify CSV"
          description="Type in a new name"
        />
      </Grid>
    <Grid item xs={12}>
      <TableCsvCustom columns={columns} rowsSelected={rowsSelected} rows={data.csvs !== undefined ? data.csvs : []} loading={false} showPreproccessing={showPreproccessing} showFeature={showFeature} height='41vh' rowPerPage={5}/>
    </Grid>
  </Grid>

  )
}
export default CSVTable