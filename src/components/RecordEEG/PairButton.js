import { Stack } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react"
import Radio from '@mui/material/Radio';
import { Button } from "@mui/material";



const PairButton = ({status, handlePairBtn, handleUnpairBtn }) => {

  return (
    <Stack direction="row" spacing={2} sx={{ml:2}}>

      {!status.pair 
      ?
        <LoadingButton
          size="medium"
          onClick={handlePairBtn}
          variant="contained"
          loading={status.loading}
        >
          Pair
        </LoadingButton>
      :
        <Button
          size="medium"
          onClick={handleUnpairBtn}
          variant="contained"
          color="error"
        >
          Unpair
        </Button>
    }
    <Radio
      checked={status.pair}
      name="radio-buttons"
    />

  </Stack>
  )
}
export default PairButton