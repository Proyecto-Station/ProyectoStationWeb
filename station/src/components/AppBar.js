import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from 'react'
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const AppBarView = () => {

  
  // Values
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailOnChange = (e) => {
    setEmail(e.target.value)
  }
  
  const passwordOnChange = (e) => {
    setPassword(e.target.value)
  }

  const loginClick = () => {

    if(email === "admin" && password === "123"){
      console.log('Correcto')
    }else{
      console.log('Incorrecto')
    }
    
  }
  
  // Modal 

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    return(
      <>
        <Box sx={{ flexGrow: 1}}>
          <AppBar postion="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2}}>
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Station
              </Typography>

              <Button color="inherit" onClick={handleOpen}>Log in</Button>
            </Toolbar>
          </AppBar>
        </Box>

        <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>  
                        <Typography id="modal-modal-title" variant="h6" component="h2" >
                          Iniciar sesion
                        </Typography>

                        <Typography id="modal-modal-title"  component="h2" sx={{ mt: 2, mb: 2 }}>
                          Ingrese su correo:
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" value={email} onChange={emailOnChange}/>

                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                            Ingrese su contraseña:
                        </Typography>
                        <TextField
                          id="outlined-password-input"
                          type="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={passwordOnChange}
                        /> 
                        <br />
                        <br />
                        <Button variant="contained" onClick={loginClick}>Log in</Button>
                    </Box>
                </Modal>
            </div>
      </>

        
    )
}

export default AppBarView;