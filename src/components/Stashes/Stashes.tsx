import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import { makeStyles, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';
import { CreateStashForm } from '../CreateStashForm';
import { AddItemForm } from '../AddItemForm';
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
                <Switch>
                    <Route exact path='/stashes'>
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
                            <DataTable />
                        </div>
                    </Route>
                    <Route exact path='/stashes/:stash_id'>
                    <div>
                            <h1>Stash Items</h1>
                            <Button onClick={handleDialogClickOpen}>Add Item</Button>
                            <Dialog open={dialogOpen} onClose={handleDialogClickOpen} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Add an Item</DialogTitle>
                                <DialogContent>
                                    <DialogContentText></DialogContentText>
                                    <AddItemForm />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDialogClickClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div>
                            <ItemDataTable />
                        </div>   
                    </Route>
                </Switch>
            </>

            ) : (
            <h1>Please log in to view your Stashes.</h1>
            )}
    </>
  )
}
