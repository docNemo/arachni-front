import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export interface IProgress {
    open: boolean;
    text?: string;
}

const Progress = ({ open, text }: IProgress) => (
    <Backdrop
        sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
    >
        <CircularProgress sx={{color:'#2196f3'}}/>
        {text && (
            <Typography variant='h6' sx={{color: 'white'}}>
                {text}
            </Typography>
        )}
    </Backdrop>
);

export default Progress;