import React, { useState } from 'react';
// import firebase from 'firebase/app';
// import { useAuth, AuthCheck } from 'reactfire';
// import 'firebase/auth';
import { Container, Button, makeStyles, Typography } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { Input } from '../SharedComponents';
import { Navbar } from '../Navbar'
import { useDispatch, useSelector, useStore } from 'react-redux';

const Alert = ( props: AlertProps ) => {
    return <MuiAlert elevation={ 6 } variant="filled" { ...props } />;
};

interface SigninProps {
    history: RouteComponentProps["history"];
    location: RouteComponentProps["location"];
    match: RouteComponentProps["match"];
};

const useStyles = makeStyles({
    inputField: {
        width: '288px',
        height: '49px',
        background: '#F1F0F0',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '8px',
        border: 'none',
        padding: '12px',
        fontFamily: 'Nunito',
        color: '#333',
        outline: 'none',
        fontSize: '16px'
    },
    divBackground: {
        background: 'rgba(51, 51, 51, 0.8)',
        boxShadow: '0px 4px 4px rbga(0, 0, 0, 0.25)',
        borderRadius: '25px',
        height: '639px',
        width: '448px',
        marginTop: '75px'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    col: {
        display: 'flex',
        flexDirection: 'column'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    start: {
        justifyContent: 'flex-start',
        alignItems: 'left'
    },
    bottomBorder: {
        borderBottom: '2px solid #333',
        width: '95%'
    },
    topMargin: {
        marginTop: '50px'
    },
    titleText: {
        fontFamily: 'Nunito',
        fontWeight: 800,
        fontSize: '32px',
        color: '#FFF',
        marginBottom: '10px'
    },
    inputMargin: {
        marginTop: '15px',
        marginBottom: '15px'
    },
    formText: {
        fontFamily: 'Nunito',
        fontWeight: 600,
        fontSize: '16px',
        marginBottom: '5px',
        marginLeft: '5px',
        color: '#FFF'
    },
    purpleButton: {
        background: '#7D5BA6',
        '&:hover': {
          background: '#6D4F92'
        },
        marginBottom: '30px',
        marginTop: '20px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        textTransform: 'none',
        borderRadius: '8px',
    },
    buttonText: {
        fontFamily: 'Nunito',
        paddingLeft: '10px',
        paddingRight: '10px',
        color: '#FFF',
        fontWeight: 800,
        fontSize: '16px'
    }
});

export const Signin = withRouter( ( props: SigninProps )  => {

    // const auth = useAuth();
    const classes = useStyles();
    const { history } = props;

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async ( event: any ) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( { email, password } )
        });

        if ( response.ok ) {
            console.log(response)
            const { token } = await response.json()
            localStorage.setItem('token', token)
            window.location.href = '/';
        } else {
            const error = await response.json();
            console.error( error.message );
            alert( 'Failed to login. ' );
        }
    };

  return (
    <>
        <Navbar />
        <Container maxWidth="sm" className={classes.divBackground}>
            <div className={`${classes.bottomBorder} ${classes.row} ${classes.center}`}>
                <Typography className={`${classes.topMargin} ${classes.titleText}`}>Sign In</Typography>
            </div>
            <form onSubmit={ handleSubmit } className={`${classes.center} ${classes.col} ${classes.topMargin} ${classes.bottomBorder}`}>
                <div className={`${classes.col} ${classes.start} ${classes.inputMargin}`}>
                    <label htmlFor="Email" className={classes.formText}>Email</label>
                    <input 
                        name="Email" 
                        type="email" 
                        value={ email } 
                        onChange={ (e) => setEmail( e.target.value )} 
                        className={`${classes.inputField}`} />
                </div>
                <div className={`${classes.col} ${classes.start} ${classes.inputMargin}`}>
                    <label htmlFor="Password" className={classes.formText}>Password</label>
                    <input 
                        name="Password" 
                        type="password" 
                        value={ password } 
                        onChange={ (e) => setPassword( e.target.value)} 
                        className={`${classes.inputField}`} />
                </div>
                <Button type="submit" className={classes.purpleButton}><span className={classes.buttonText}>Sign In</span></Button>
            </form>
        </Container>
    </>
  );
});
