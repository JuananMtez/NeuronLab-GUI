import { Grid } from "@mui/material"
import TextFieldStyled from "../TextFieldStyled/TextFieldStyled"

const FormInfoCSV = ({ csv, experiment }) => {

  return (
    <Grid container spacing={2} sx={{mt:'2vh'}}>
      <Grid item xs={12}>
        <TextFieldStyled
          fullWidth
          name="name"
          label="Name"
          value={csv.name}
          InputLabelProps={{ shrink: true }}
        />       
           
      </Grid>      
      <Grid item xs={6}>
      <TextFieldStyled
          fullWidth
          name="type"
          label="Type"
          value={csv.original ? 'original' : 'copied'}
          InputLabelProps={{ shrink: true }}
        />       
      </Grid>
      <Grid item xs={6}>
      <TextFieldStyled
          fullWidth
          name="subject"
          label="Subject"
          value={csv.subject_name}
          InputLabelProps={{ shrink: true }}
        />       
      </Grid>
    </Grid>
  )

} 

export default FormInfoCSV