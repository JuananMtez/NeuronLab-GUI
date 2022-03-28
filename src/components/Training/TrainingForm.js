import { Button, Grid, Stack } from "@mui/material"
import { useState } from "react"
import TableCSVPositions from "../DataCSV/TableCSVPositions"
import { CustomSelect, StyledOption } from "../Select/CustomSelect";
import TextFieldStyled from "../TextFieldStyled/TextFieldStyled";
import InputAdornment from '@mui/material/InputAdornment';
import DialogStyled from '../Dialog/DialogStyled'



const TrainingForm = ({ csv }) => {

  const [learning, setLearning] = useState('')
  const [algorithmMachine, setAlgorithmMachine] = useState('')
  const [knnNeigbour, setKnnNreigbour] = useState(0)
  const [randomForest, setRandomeForest] = useState({max_depth: 0, n_estimators: 0, random_state: 0})
  const [svm, setSvm] = useState('')
  const [percent, setPercent] = useState({training_data: 0, testing_data: 0})
  const [name, setName] = useState('')
  const [csvsSelected, setCsvsSelected] = useState([])
  const [open, setOpen] = useState(false)


  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleName = (e) => setName(e.target.value)

  const handleTrainingBtn = () => {

    let list = [...csvsSelected, csv.id]


    let data = {name: name, csvs: list, testing_data: percent.testing_data, training_data: percent.training_data}
    let algorithm;
    console.log(list)
    if (learning === 'machine') {
      switch(algorithmMachine){
        case 'KNN':
          algorithm = {n_neighbors: knnNeigbour}
          break
        case 'Random Forest':
          algorithm = {max_depth: randomForest.max_depth, n_estimators: randomForest.n_estimators, random_state: randomForest.random_state}
          break
        case 'SVM':
          algorithm = {kernel: svm}
          break
          
        default:
          break
      }
      window.api.applyTrainingMachine({...data, algorithm: algorithm})

    }
    

    setOpen(false)
    setLearning('')
    setAlgorithmMachine('')
    setKnnNreigbour(0)
    setRandomeForest({max_depth: 0, n_estimators: 0, random_state: 0})
    setSvm('')
    setPercent({training_data: 0, testing_data: 0})
    setName('')
    setCsvsSelected([])

  
  }

  function renderValue(option, text) {
    if (option == null) {
      return <span>{text}</span>;
    }
  
    return (
      <span>
        {option.label}
      </span>
    );
  }

  const handleNeighbors = (e) => {
    if (e.target.value > 0)
      setKnnNreigbour(e.target.value)
  }

  const handleRandomForest = (e) => {
    if (e.target.value >= 0)
      setRandomeForest({...randomForest, [e.target.name]: e.target.value})
  } 

  const handlePercent = (e) => {
    if (e.target.value >= 0) {
      setPercent({...percent, [e.target.name]: e.target.value})
    }
  }

  const getFormLearning = () => {
    if (learning === 'machine')
      return (
        <Grid item xs={12} sx={{mt:'2vh'}}>
          <Stack direction="row" spacing={3}>
            <CustomSelect renderValue={o => renderValue(o, 'Algorithm')} value={algorithmMachine} onChange={setAlgorithmMachine}>
              <StyledOption value={'KNN'}>KNN</StyledOption>
              <StyledOption value={'Random Forest'}>Random Forest</StyledOption>
              <StyledOption value={'SVM'}>SVM</StyledOption>
            </CustomSelect>
            {
              algorithmMachine === 'KNN' &&
                <TextFieldStyled
                  value={knnNeigbour}
                  name="neighbors"
                  label="Neighbors"      
                  type="number"
                  onChange={handleNeighbors} 
                />
            } 
            {
              algorithmMachine === 'Random Forest' &&
            <>
              <TextFieldStyled
                value={randomForest.max_depth}
                name="max_depth"
                label="Maximum depth of the tree"      
                type="number"
                onChange={handleRandomForest} 
              />               
              <TextFieldStyled
                value={randomForest.n_estimators}
                name="n_estimators"
                label="Number of trees in the forest."      
                type="number"
                onChange={handleRandomForest} 
             />
              <TextFieldStyled
                value={randomForest.n_stimators}
                name="random_state"
                label="Control the random number"      
                type="number"
                onChange={handleRandomForest} 
              />
            </>
            }
            {
              algorithmMachine === 'SVM' &&
              <CustomSelect renderValue={o => renderValue(o, 'Kernel')} value={svm} onChange={setSvm}>
              <StyledOption value={'linear'}>linear</StyledOption>
                <StyledOption value={'poly'}>poly</StyledOption>
                <StyledOption value={'rbf'}>rbf</StyledOption>
             </CustomSelect>
            } 
          </Stack>

        </Grid>
      )
    
  }
  
  
  return (
    <Grid container>
      <Grid item xs={12}>
        <CustomSelect renderValue={o => renderValue(o, 'Learning Method')} value={learning} onChange={setLearning}>
          <StyledOption value={'machine'}>Machine Learning</StyledOption>
          <StyledOption value={'deep'}>Deep Learning</StyledOption>
        </CustomSelect> 
      </Grid>
      {getFormLearning()}
      <Grid item xs={12} sx={{mt:'5vh'}}>
        <Stack direction="row" spacing={2}>
          <TextFieldStyled
            value={percent.training_data}
            name="training_data"
            label="Training data"      
            type="number"
            onChange={handlePercent} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">%</InputAdornment>
              )
            }}
          />    
            <TextFieldStyled
            value={percent.testing_data}
            name="testing_data"
            label="Testing data"      
            type="number"
            onChange={handlePercent} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">%</InputAdornment>
              )
            }}
          />     
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{mt:'3vh'}}>
        <h3 style={{color:'white'}}>Selectables CSVs</h3>
      </Grid>
      <Grid item xs={7}>
        <TableCSVPositions csvid={csv.id} csvsSelected={setCsvsSelected}/>  
      </Grid>
      <Grid item xs={12} sx={{mt:'4vh'}}>
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          fullWidth
          disabled={
            learning === '' || 
            algorithmMachine === '' ||
            (algorithmMachine === 'SVM' && svm === '') ||
            ((parseInt(percent.training_data) + parseInt(percent.testing_data) !== 100))

          }
          >
            Train
          </Button>
      </Grid>
      <Grid item xs={12}>
        <DialogStyled
          open={open}
          handleClose={handleClose}
          text={name}
          handleText={handleName}
          handleClick={handleTrainingBtn}
          title="Copy CSV"
          description="Type in a name for the new CSV"
        />
      </Grid>
    </Grid>
  )
}
export default TrainingForm