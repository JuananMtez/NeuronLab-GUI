import FormProfile from "../components/FormProfile/FormProfile"
import Sidebar from "../components/Sidebar/Sidebar"

const Profile = () => {

  return (
    <Sidebar init={true} pos='0' tab={'Profile'}>
        <FormProfile/>
    </Sidebar>
  )
}


export default Profile