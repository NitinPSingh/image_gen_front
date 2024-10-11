import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react'

// enum size {
//     'sm' = 40,
//     'md' = 300,
//     'lg' = 400
// }

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ImagePreview({ uri, w, h }: { uri: string, w: string, h: string }) {

    const [open,setOpen] = useState<boolean>(false)

    const handleClose = () => {
      setOpen(false)
    }
    return (
    <React.Fragment>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <img
          src={uri}
          alt="img"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%", 
            maxHeight: "100%"
          }}
        />

       </Box>
      </Modal>
      <img
            onClick={()=>setOpen(true)}
            src={uri}
            alt="img"
            style={{
              width:w,
              height:h,
              cursor:'pointer',
              borderRadius: '5%'
        }}/>


    </React.Fragment>)
}
