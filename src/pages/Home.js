import Sidebar from "../components/Sidebar/Sidebar"
import LogoUm from '../img/logo_umu.jpeg'
import LogoBrain from '../img/brainlab_logo.png'

import  Container  from "@mui/material/Container"
import  Box  from "@mui/material/Box"
import  Grid  from "@mui/material/Grid"


import "../styles/Home.css"
const Home = () => {
  return (
    <Sidebar init={false} pos='-1'>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
         <h1 className="title">Welcome to BrainLab</h1>

        </Box>
        <p className="text">Application to provide researchers to study brain signals obtained from different subjects</p>
        <p className="text">Implementation of a framework capable of EEG signal acquisition from BCI or other external devices, signal proccessing and machine learning using trained classifiers</p>
        <p className="text">This project is part of the End of Degree Project in Computer Engineering at the University of Murcia</p>

        <Grid container spacing={10}>
          <Grid item xs={6} >
            <img className="um" src={LogoUm} alt="logo_um"/>

          </Grid>
          <Grid item xs={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', position:'relative'}}>
            <img className="brainlab" src={LogoBrain} alt="logo_brainlab"/>

          </Grid>
        </Grid>
                

      </Container>
    </Sidebar>
  )
}

export default Home
