
import { memo, useEffect, useState } from "react";
import Table from "../Table/Table";
import axios from "axios";

const TableCSVPositions = ({ csvid, csvsSelected }) => {

  const [csvs, setCsvs] = useState([])
  const [loadingTraining, setLoadingTraining] = useState(true)
  useEffect(() => {
    let isMounted = true
    if (isMounted && csvid !== undefined) {
      axios.get(`http://localhost:8000/csv/${csvid}/same_feature`)
      .then(response => {
        setCsvs(response.data)
        setLoadingTraining(false)
      })

    }
    return () => { isMounted = false };
    
  }, [csvid])

  const columns = [
  
    { field: 'name', headerName: 'Name', width: 250, headerAlign: 'center', sortable: false},
    { field: 'subject_name', headerName: 'Subject', width: 300, headerAlign: 'center', sortable: false},
    { field: 'date', headerName: 'Date', width: 200, headerAlign: 'center', sortable: false},

  ]

  return (
    <Table columns={columns} rows={csvs} rowsSelected={csvsSelected} loading={loadingTraining} showCheck={true} height='29vh' rowPerPage={3}/>

  )
}
export default TableCSVPositions