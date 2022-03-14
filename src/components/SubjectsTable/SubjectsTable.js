import { useEffect, useState } from 'react';
import Table from './Table/Table';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import { OpenInNewSharp } from '@mui/icons-material';
import { DeleteSharp } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";




const SubjectsTable = ({ style }) => {

  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])
  const navigate = useNavigate()

  const deleteSubject = (id) => {
    axios.delete(`http://localhost:8000/subject/${id}`)
    setRows(rows.filter(e => e.id !== id))
  }
  
  
  const OpenBtn = (params) => {
    return (
      <IconButton 
        onClick={e => {
          e.stopPropagation()
          let data = rows.find(e => e.id === params.id)
          navigate('/subject/data', { state: data })
        }}
      >
        <OpenInNewSharp sx={{color:'white', fontSize:'2.5rem'}}/>
      </IconButton>
    )
  }
  
  const DeleteBtn = (params) => {
    return (
      <IconButton 
        onClick={e => {
          e.stopPropagation()
          deleteSubject(params.id)
          
        }}
      >
        <DeleteSharp sx={{color:'white', fontSize:'2.5rem'}}/>
      </IconButton>
  
    )
  }
  const columns = [
  
    { field: 'name', headerName: 'Name', width: 200, headerAlign: 'center', sortable: false},
    { field: 'surname', headerName: 'Surname', width: 200, headerAlign: 'center', type: 'number', sortable: false},
    { field: 'age', headerName: 'Age', type: 'number', width: 200, headerAlign: 'center', sortable: false },
    {
      width: 150,
      headerName: 'Open',
      field: 'open',
      renderCell: OpenBtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
    {
      width: 90,
      headerName: 'Delete',
      field: 'delete',
      renderCell: DeleteBtn,
      disableClickEventBubbling: true,
      headerAlign: 'center',
      sortable: false
    },
  ];
  
  
  useEffect(() => {
    let isMounted = true;  
    axios.get('http://localhost:8000/subject')
    .then(response => {
      if (isMounted) {
        setLoading(false)
        setRows(response.data)
      }
      return () => { isMounted = false };

    })

  }, [])

  return (
    <Table style={style} columns={columns} rows={rows} loading={loading}  showCheck={false}/>
  );
}

export default SubjectsTable