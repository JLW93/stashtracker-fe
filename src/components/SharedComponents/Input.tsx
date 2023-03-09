import React, { forwardRef } from 'react';
import { TextField, makeStyles } from '@material-ui/core';

interface inputType {
    name: string;
    placeholder?: string;
    className?: string;
    type?: 'text' | 'password' | 'email'
};

const useStyles = makeStyles({
    input: {
        background: '#F1F0F0',
        borderRadius: '30px',
        border: '0px',
        height: '30px',
        padding: '10px',
        fontFamily: 'Nunito'
    },
})

export const Input = forwardRef( ( props: inputType, ref )  => {
    const classes = useStyles();

    return (
        <TextField InputProps={{ disableUnderline: true }} margin="normal" inputRef={ ref } fullWidth type="text" { ...props } className={classes.input}></TextField>
    );
});