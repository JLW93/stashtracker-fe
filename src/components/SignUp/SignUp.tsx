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

interface SignUpProps {
    history: RouteComponentProps["history"];
    location: RouteComponentProps["location"];
    match: RouteComponentProps["match"];
};

export const SignUp = withRouter( ( props: SignUpProps )  => {

    // const auth = useAuth();
    // const classes = useStyles();
    const { history } = props;

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmEmail, setConfirmEmail ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const handleSubmit = async ( event: any ) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( { email, confirmEmail, password, confirmPassword } )
        });

        if ( response.ok ) {
            console.log(response)
            // const { token } = await response.json()
            // localStorage.setItem('token', token)
            const data = await response.json()
            alert( data.message )
            window.location.href = '/';
        } else {
            const error = await response.json();
            console.error( error.error );
            alert( 'Account creation failed.' );
        }
    };

  return (
    <>
        <Navbar />
        <Container maxWidth="sm">
            <Typography>Sign Up</Typography>
            <form onSubmit={ handleSubmit }>
                <div>
                    <input name="Email" type="email" value={ email } onChange={ (e) => setEmail( e.target.value )} placeholder="Email" />
                </div>
                <div>
                    <input name="Confirm Email" type="email" value={ confirmEmail } onChange={ (e) => setConfirmEmail( e.target.value )} placeholder="Re-enter Email" />
                </div>
                <div>
                    <input name="Password" type="password" value={ password } onChange={ (e) => setPassword( e.target.value)} placeholder="Password" />
                </div>
                <div>
                    <input name="Confirm Password" type="password" value={ confirmPassword } onChange={ (e) => setConfirmPassword( e.target.value)} placeholder="Re-enter Password" />
                </div>
                <Button type="submit" variant="contained" color="primary">Sign In</Button>
            </form>
        </Container>
    </>
  );
});
