import React from 'react'

import { Snackbar, Slide, Alert, AlertTitle } from '@mui/material'

function SignInError({open, message, type, handleChangeClose}) {

  const TransitionDown = (props) => {
    return <Slide {...props} direction='down' />
  }

  return(
    <>
      <Snackbar
        open={open}
        onClose={handleChangeClose}
        TransitionComponent={TransitionDown}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert
          onClose={handleChangeClose}
          severity={type}
          sx={{ width: '100%' }}
        >
          <AlertTitle>Error</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default SignInError
