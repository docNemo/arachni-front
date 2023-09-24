import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export type State = 'error'|'info'|'success'|'warning';

export interface IInfoBox {
  open: boolean;
  state?: State;
  text: string;
  close: () => void;
}

const InfoBox = ({ open, close, state, text }: IInfoBox) => (
  <Snackbar
    open={open}
    onClose={close ?? null}
    autoHideDuration={6000}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  >
    <Alert severity={state ?? 'info'} sx={{ width: '100%' }}>
      {text}
    </Alert>
  </Snackbar>
);

export default InfoBox;
