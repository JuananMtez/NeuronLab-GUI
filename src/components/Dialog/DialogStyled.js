import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import { Button } from '@mui/material';
import TextFieldStyled from '../TextFieldStyled/TextFieldStyled';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogStyled = ({ open, handleClose, text, handleText, handleSend }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: '#676767',
          color:'white',
          fontWeight:'bold'
        }}}
    >
      <DialogTitle>{"Copy CSV"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide" sx={{color:'white'}}>
          Write a name for the new CSV
        </DialogContentText>
        <TextFieldStyled
            autoFocus
            onChange={e => handleText(e)}
            id="name"
            value={text}
            label="Name"
            fullWidth
            variant="standard"
            sx={{color:'white', mt:2}}
          />
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="contained" onClick={handleClose}color="error">Cancel</Button>
        <Button disabled={text.length === 0 ? true : false} size="small" variant="contained" onClick={handleSend}>Accept</Button>
      </DialogActions>
    </Dialog>
  )
}
export default DialogStyled