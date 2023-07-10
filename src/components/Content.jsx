import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toast from './Toast';
import CustomAlert from './CustomAlert';
import { ToastContext } from '../context/ToastContext';
import { CircularProgress, Stack } from '@mui/material';
import LikedToastCard from './LikedToastCard';

export default function Content() {

  // Access global state variables using useContext hook
  const { isLoading, likedToasts } = useContext(ToastContext);

  // Render a loading indicator based on isLoading global state variable
  if (isLoading) {
    return (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress />
    </Box>)
  }
  // jsx
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>
       {/* Ternary operator that shows an list of liked toasts or a h6 depending on likedToasts   */}
      {likedToasts?.length < 1 ? <Typography variant="h6" sx={{ flexGrow: 1, marginTop: 2 }}>
        No liked submissions yet
      </Typography> :
        <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
          {likedToasts?.map((toast, index) => <LikedToastCard item={toast} index={index} key={index} />)}
        </Stack>}
      <Toast />
      <br />
      <CustomAlert />
    </Box>
  );
}
