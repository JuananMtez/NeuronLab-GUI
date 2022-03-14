import { useLocation } from "react-router-dom"
import FormSubjectDisabled from "../components/FormSubject/FormSubjectDisabled"
import Sidebar from "../components/Sidebar/Sidebar"
const DataSubject = () => {

  const { state } = useLocation()
  return (
    <Sidebar init={false} pos='1' tab={'Subject data'}>
      <FormSubjectDisabled data={state}/>
    </Sidebar>
  )
}

export default DataSubject