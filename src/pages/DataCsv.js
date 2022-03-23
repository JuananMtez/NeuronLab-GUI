import { useState } from "react"
import Sidebar from "../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { Container, Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import FormInfoCSV from "../components/DataCSV/FormInfoCSV"

const DataCsv = () => {

  const { state } = useLocation()
  const [init, setInit] = useState(state.sidebar)
  const { csv, experiment } = state
  const navigate = useNavigate()


  const handleClickBack = () => navigate('/experiment/data', { state: {id: experiment, sidebar: state.sidebar}})
  

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
          <FormInfoCSV csv={csv} experiment={experiment}/>
       </Box>
      </Container>
    </Sidebar>

  )
}
export default DataCsv