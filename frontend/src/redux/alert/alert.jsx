import { Snackbar } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';

export function Alert() {
  const alert = useSelector((state) => state.alert);
  const { message, open } = alert;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      message={message}
      key={'bottomright'}
    />
  )
}