import React, { useState } from 'react';
import { Alert } from '@mui/material';

const LayoutAlert = (props) => {
  const [type] = useState(props.type)
  const [message] = useState(props.msg)

  return(
    <Alert severity={type}>{message}</Alert>
  )
}

export default LayoutAlert
