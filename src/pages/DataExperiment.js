
import Sidebar from "../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import FormExperimentDisabled from "../components/FormExperiment/FormExperimentDisabled"


const DataExperiment = () => {

  const { state } = useLocation()
  const [init, setInit] = useState(state.sidebar)
  const [experiment, setExperiment] = useState({})
  const [researchersNot, setResearchersNot] = useState([])
  const [subjectsNot, setSubjectsNot] = useState([])

  const id = state.id

  useEffect(() => {
    axios.get(`http://localhost:8000/experiment/${id}`)
    .then(response => setExperiment(response.data))

    axios.get(`http://localhost:8000/researcher/experiment/${id}`)
    .then(response => setResearchersNot(response.data))

    axios.get(`http://localhost:8000/subject/not/${id}`)
    .then(response => setSubjectsNot(response.data))
  }, [id])

  return (
    <Sidebar init={init} pos='2' tab={'Experiment'} handleSidebar={setInit}>
      <FormExperimentDisabled 
        data={experiment} 
        researchers={researchersNot} 
        handleResearchers={setResearchersNot} 
        handleExperiments={setExperiment}
        subjects={subjectsNot}
        handleSubjects={setSubjectsNot}
        init={init}/>
    </Sidebar>
  )
}
export default DataExperiment