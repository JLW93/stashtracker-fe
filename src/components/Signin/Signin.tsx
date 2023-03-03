import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useAuth, AuthCheck } from 'reactfire';
import 'firebase/auth';
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



export const Signin = withRouter( ( props: SigninProps )  => {

    const auth = useAuth();
    // const classes = useStyles();
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
    
    const sign_in_with_google = async () => {
        const response = await auth.signInWithPopup( new firebase.auth.GoogleAuthProvider())
    };

    const sign_out = async () => {
        await auth.signOut();
    };

  return (
    <>
        <Navbar />
        <Container maxWidth="sm">
            <Typography>Sign In</Typography>
            <form onSubmit={ handleSubmit }>
                <div>
                    
                    <input name="Email" type="email" value={ email } onChange={ (e) => setEmail( e.target.value )} placeholder="Email" />
                </div>
                <div>
                    
                    <input name="Password" type="password" value={ password } onChange={ (e) => setPassword( e.target.value)} placeholder="Password" />
                </div>
                <Button type="submit" variant="contained" color="primary">Sign In</Button>
            </form>

            <AuthCheck fallback={
                <Button onClick={ sign_in_with_google }>Sign in with Google</Button>
            }>
                <Button variant="contained" color="primary" onClick={ sign_out }>Sign Out</Button>
            </AuthCheck>
        </Container>
    </>
  );
});
