import React from 'react'

import { Snackbar, Slide, Alert, AlertTitle } from '@mui/material'

function SnackbarInfo({ open, message, type, title, handelChangeNotify }) {
  const TransitionDown = (props) => {
    return <Slide {...props} direction='down' />
  }

  return (
    <>
      <Snackbar
        open={open}
        onClose={handelChangeNotify}
        TransitionComponent={TransitionDown}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert
          onClose={handelChangeNotify}
          severity={type}
          sx={{ width: '100%' }}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default SnackbarInfo
