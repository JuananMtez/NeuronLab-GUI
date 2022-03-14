import FormSubject from "../components/FormSubject/FormSubject"
import Sidebar from "../components/Sidebar/Sidebar"


const AddSubject = () => {
  return (
    <Sidebar init={false} pos='1' tab={'Add Subject'}>
      <FormSubject/>
    </Sidebar>
  )
}

export default AddSubject