import AddButton from "../components/AddButton/AddButton"
import Sidebar from "../components/Sidebar/Sidebar"
import SubjectsTable from "../components/SubjectsTable/SubjectsTable"
import { useNavigate } from "react-router-dom";



const Subjects = () => {
  const navigate = useNavigate()

  const handleAddSubject = () => {
    navigate('/subject/add')
  }

  return (
    
    <Sidebar init={true} pos='1' tab={'Subjects'}>
      <SubjectsTable style={{marginTop: '0vh'}}/>
      <AddButton onClick={handleAddSubject}/>
    </Sidebar>
  )
}


export default Subjects