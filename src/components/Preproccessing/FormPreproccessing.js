import { useState } from "react";
import { Grid, Box, Stack, Button } from "@mui/material";

import { CustomSelect, StyledOption } from "../Select/CustomSelect";
import TextFieldStyled from "../TextFieldStyled/TextFieldStyled";
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';




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


const FormPreproccessing = ({ csvs }) => {



  const [preproccesing, setPreproccessing] = useState('')
  const [filterMethod, setFilterMethod] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filter, setFilter] = useState({ low: '', high: '' })
  const [filtersNotch, setFiltersNotch] = useState([])
  const [filterNotch, setFilterNotch] = useState('')
  const [filterDownSampling, setFilterDownSampling] = useState('')
  const [preproccessings, setPreproccessings] = useState([])


  const handleKeyDown = (event) => {

    if (event.key === 'Enter') {
      if (filtersNotch.filter(e => e === filterNotch).length === 0) {
        let list = [...filtersNotch]
        list.push(filterNotch)
        setFiltersNotch(list)
        setFilterNotch('')
      }
    }
  }

  const handleDeleteChip = (e, v) => {
    e.preventDefault()
    let list = [...filtersNotch]
    setFiltersNotch(list.filter(f => f !== v))   
  }
  const handleDeleteProccesingChip = (e, index) => {
    let list = [...preproccessings]
    list.splice(index, 1); // 2nd parameter means remove one item only
    setPreproccessings(list)
  }


  const handleAddPreproccessing = () => {

    let prep;
    if (preproccesing === 'filtering') {
      if (filterType === 'bandpass') {
        prep = {preproccessing:'filtering', filter_type: 'bandpass', filter_method: filterMethod, low_freq: filter.low, high_freq: filter.high}
      } else if (filterType === 'notch')
        prep = {preproccessing:'filtering', filter_type: 'notch', filter_method: filterMethod, freqs:filtersNotch}
    } else if (preproccesing === 'downsampling')
      prep = {preproccessing:'downsampling', freq:filterDownSampling}

    let list = [...preproccessings]
    list.push(prep)

    setPreproccessings(list)

    setPreproccessing('')
    setFilterType('')
    setFilterMethod('')
    setFilterNotch('')
    setFiltersNotch([])
    setFilterDownSampling('')
    setFilter({low: '', high: ''})
  }
  const handleApply = () => {
    setPreproccessings([])
    window.api.applyFilter({csvs: csvs, preproccessings: preproccessings})

  }

  return (

    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomSelect renderValue={o => renderValue(o, 'Preproccessing type')} value={preproccesing} onChange={setPreproccessing}>
          <StyledOption value={'filtering'}>Filtering</StyledOption>
          <StyledOption value={'downsampling'}>Downsampling</StyledOption>
        </CustomSelect>
      </Grid>
      {
        preproccesing === 'filtering' &&

        <Grid item xs={12} sx={{mt:3}}>
          <Stack direction="row" spacing={0}>
            <CustomSelect renderValue={o => renderValue(o, 'Filter Type')} value={filterType} onChange={setFilterType}>
              <StyledOption value={'bandpass'}>Bandpass</StyledOption>
              <StyledOption value={'notch'}>Notch</StyledOption>
            </CustomSelect>

            <Box sx={{ ml: '2vh' }}>
              <CustomSelect renderValue={o => renderValue(o, 'Filter Method')} value={filterMethod} onChange={setFilterMethod}>
                <StyledOption value={'iir'}>IIR</StyledOption>
                <StyledOption value={'fir'}>FIR</StyledOption>
              </CustomSelect>
            </Box>
          </Stack>
        </Grid>
      }
      {
        preproccesing === 'filtering' && filterType === 'bandpass' &&
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Stack direction="row" spacing={3}>
            <TextFieldStyled
              name="lowpass"
              label="Lower edge of the frequency"
              value={filter.low}
              onChange={(e) => setFilter({ ...filter, low: e.target.value })}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Hz</InputAdornment>
                )
              }}
            />
            <TextFieldStyled
              name="highpass"
              label="Higher edge of the frequency"
              value={filter.high}
              onChange={(e) => setFilter({ ...filter, high: e.target.value })}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Hz</InputAdornment>
                )
              }}
            />
          </Stack>


        </Grid>
      }
      {
        preproccesing === 'filtering' && filterType === 'notch' &&
        (
          <>
            <Grid item xs={12} sx={{ mt: 3 }}>

              <TextFieldStyled
                name="notch"
                label="Frequency"
                value={filterNotch}
                onChange={(e) => setFilterNotch(e.target.value)}
                onKeyDown={handleKeyDown}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Hz</InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                {filtersNotch.map((e, index) => <Chip onDelete={ev => handleDeleteChip(ev, e)} key={index} label={`${e} Hz`} />)}
                </Stack>
            </Grid>
          </>
        )

      }
      {
          preproccesing === 'filtering' && filterType === 'notch' && filtersNotch.length === 0 &&

        <Grid item xs={12}>
          <p style={{color: "#c9382b", fontSize:'20px', marginLeft:'2vh'}}>* Press enter to add a frequency</p>
        </Grid>
      }
      {
        preproccesing === 'downsampling' &&
        <Grid item xs={12} sx={{mt:3}}>
            <TextFieldStyled
              name="downsampling"
              label="Frequency"
              value={filterDownSampling}
              onChange={(e) => setFilterDownSampling(e.target.value)}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Hz</InputAdornment>
                )
              }}
            />
        </Grid>
      }
            <Grid item xs={12} sx={{mt:3}}>
        <Button 
          sx={{width:'60%'}} 
          variant="contained"
          disabled={preproccesing === '' || 
            (preproccesing === 'filtering' && (filterType === '' || filterMethod === '')) || 
            (preproccesing === 'filtering' && filterType === 'bandpass' && filter.high === '' && filter.low === '')||
            (preproccesing === 'filtering' && filterType === 'notch' && filtersNotch.length === 0)
            
          }
          onClick={handleAddPreproccessing}
        >
          Add
        </Button>
      </Grid>
          {preproccessings.map((e, index) => (
          <Grid  item xs={12} sx={{mt:1}}>
            <Chip key={index} onDelete={ev => handleDeleteProccesingChip(ev, index)} sx={{color:'white'}} label={`${index+1}. ${JSON.stringify(e, null, 4)}`} />
          </Grid>

          ))}
      <Grid item xs={12} sx={{mt:3}}>
        <Button 
          fullWidth 
          variant="contained"
          disabled={preproccessings.length === 0 || csvs.length === 0}
          onClick={handleApply}
        
        >
          Apply
        </Button>
      </Grid>

    </Grid>





  )
}

export default FormPreproccessing