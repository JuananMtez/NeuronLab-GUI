import { Button, Grid } from "@mui/material";
import { useState } from "react"
import { CustomSelect, StyledOption } from "../Select/CustomSelect";


const FormFeatureExtraction = ({csvs}) => {
  const [feature, setFeature] = useState('')

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

  const handleClick = () => {
    
    let msg = {csvs: csvs, feature: feature}
    console.log(msg)
    window.api.applyFeature(msg)
    setFeature('')
  }



  return (
    <Grid container>
      <Grid item xs={12}>
      <CustomSelect renderValue={o => renderValue(o, 'Feature')} value={feature} onChange={setFeature}>
        <StyledOption value={'mean'}>Mean</StyledOption>
        <StyledOption value={'variance'}>Variance</StyledOption>

      </CustomSelect> 
      </Grid>
      <Grid item xs={12} sx={{mt:'5vh'}}>
        <Button
          variant="contained"
          fullWidth
          disabled={csvs.length === 0 || feature === '' }
          onClick={handleClick}
        >
          Apply
        </Button>
      </Grid>

    </Grid>


  )
}
export default FormFeatureExtraction