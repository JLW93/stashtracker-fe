import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useAuth, AuthCheck } from 'reactfire';
import 'firebase/auth';
import { Container, Button, makeStyles, Typography } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { Input } from '../SharedComponents';
import { Navbar } from '../Navbar'

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

    const sign_in = async () => {
        const response = await auth.signInWithPopup( new firebase.auth.GoogleAuthProvider())
    };

    const sign_out = async () => {
        await auth.signOut();
    }

  return (
    <>
        <Navbar />
        <Container maxWidth="sm">
            <Typography>Sign In</Typography>
            <form action="/signin" method="POST">
                <div>
                    <label htmlFor="email">Email</label>
                    <Input name="email" placeholder="Enter email here" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input name="password" placeholder="Enter password here" />
                </div>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>

            <AuthCheck fallback={
                <Button onClick={ sign_in }>Sign in with Google</Button>
            }>
                <Button variant="contained" color="primary" onClick={ sign_out }>Sign Out</Button>
            </AuthCheck>
        </Container>
    </>
  )
})
