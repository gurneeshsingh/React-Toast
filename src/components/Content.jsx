import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toast from './Toast';
import CustomAlert from './CustomAlert';
import { ToastContext } from '../context/ToastContext';

export default function Content() {



  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
        TODO: List of liked submissions here (delete this line)
      </Typography>
      <Toast />
      <br/>
      <CustomAlert />
    </Box>
  );
}
