import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import { makeStyles, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';
import { CreateStashForm } from '../CreateStashForm';
import { DataTable } from '../DataTable'
import { ItemDataTable } from '../ItemDataTable';

import { Navbar } from '../Navbar'

const useStyles = makeStyles({

})

export const Stashes = () => {

    const classes = useStyles();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [ loggedIn, setLoggedIn ] = useState(false);

    useEffect( () => {
        const token = localStorage.getItem('token');
        if ( token ) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    const handleDialogClickOpen = () => {
        setDialogOpen(true)
    };

    const handleDialogClickClose = () => {
        setDialogOpen(false)
    };

  return (
    <>
        <Navbar />
        {loggedIn ? (
            <>
                <div>
                    <h1>My Stashes</h1>
                    <Button onClick={handleDialogClickOpen}>Create a new Stash</Button>
                    <Dialog open={dialogOpen} onClose={handleDialogClickOpen} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create a new Stash</DialogTitle>
                        <DialogContent>
                            <DialogContentText></DialogContentText>
                            <CreateStashForm />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClickClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <Switch>
                        <Route exact path='/stashes'>
                            <DataTable />
                        </Route>
                        <Route exact path='/stashes/:stash_id/items'>
                            <ItemDataTable />
                        </Route>
                    </Switch>
                </div>
            </> ) : (
                <h1>Please log in to view your Stashes.</h1>
            )}
    </>
  )
}
