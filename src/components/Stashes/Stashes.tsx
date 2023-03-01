import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import { makeStyles, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';

import { Navbar } from '../Navbar'

const useStyles = makeStyles({

})

export const Stashes = () => {

    const classes = useStyles();

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogClickOpen = () => {
        setDialogOpen(true)
    };

    const handleDialogClickClose = () => {
        setDialogOpen(false)
    };

  return (
    <>
        <Navbar />
        <div>
            <h1>My Stashes</h1>
            <Button onClick={handleDialogClickOpen}>Create a new Stash</Button>
            <Dialog open={dialogOpen} onClose={handleDialogClickOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create a new Stash</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    {/* <CreateStashForm /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClickClose}>Create Stash</Button>
                    <Button onClick={handleDialogClickClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
        <div>
            <div>
                {/* <DataTable /> */}
            </div>
        </div>
    </>
  )
}
