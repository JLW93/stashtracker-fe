import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import { makeStyles, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, createTheme } from '@material-ui/core';
import { CreateStashForm } from '../CreateStashForm';
import { AddItemForm } from '../AddItemForm';
import { DataTable } from '../DataTable'
import { ItemDataTable } from '../ItemDataTable';

import { Navbar } from '../Navbar'

const useStyles = makeStyles({
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
    end: {
        justifyContent: 'flex-end'
    },
    purpleButton: {
        background: '#7D5BA6',
        color: '#FFF',
        '&:hover': {
          background: '#6D4F92'
        },
        marginBottom: '10px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        textTransform: 'none'
    },
    titleText: {
        fontFamily: 'Nunito',
        fontWeight: 800,
        fontSize: '36px',
        color: '#FFF',
        marginTop: '25px',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    purpleText: {
        color: '#643173',
    },
    tableBackgroundTop: {
        background: 'rgba(51, 51, 51, 0.7)',
        borderRadius: '25px 25px 0px 0px'
    },
    bottomBorder: {
        borderBottom: '2px solid #333',
        width: '95%'
    },
    sideMargin: {
        marginLeft: '25px',
        marginRight: '27px'
    },
    topMargin: {
        marginTop: '75px'
    },
    // dialogBackgroundMain: {
    //     background: 'rgba(51, 51, 51, 0.9)',
    //     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    //     borderRadius: '0px'
    // },
    // dialogBackgroundTop: {
    //     background: 'rgba(51, 51, 51, 0.9)',
    //     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    //     borderRadius: '20px 20px 0px 0px'
    // },
    // dialogBackgroundBottom: {
    //     background: 'rgba(51, 51, 51, 0.9)',
    //     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    //     borderRadius: '0px 0px 20px 20px'
    // },
    greenButton: {
        background: '#89CE94',
        color: '#FFF',
        '&:hover': {
          background: '#6FC37D'
        }
      },
      redButton: {
        background: '#CD4242',
        color: '#333',
        '&:hover': {
          background: '#C13333'
        }
      }
});

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
                        <div className={`${classes.tableBackgroundTop} ${classes.sideMargin} ${classes.topMargin} ${classes.col} ${classes.center}`}>
                        <h1 className={classes.titleText}>My <span className={classes.purpleText}>Stashes</span></h1>
                            <div className={classes.bottomBorder}>
                                <div className={`${classes.end} ${classes.row}`}>
                                    <Button onClick={handleDialogClickOpen} className={classes.purpleButton}>Create a new Stash</Button>
                                    <Dialog open={dialogOpen} onClose={handleDialogClickOpen} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Create a new Stash</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText></DialogContentText>
                                            <CreateStashForm />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleDialogClickClose} className={classes.redButton}>Cancel</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                        <div>
                            <DataTable />
                        </div>
                    </Route>
                    <Route exact path='/stashes/:stash_id'>
                    <div className={`${classes.tableBackgroundTop} ${classes.sideMargin} ${classes.topMargin} ${classes.col} ${classes.center}`}>
                            <h1 className={classes.titleText}><span className={classes.purpleText}>Stash</span> Items</h1>
                            <div className={classes.bottomBorder}>
                                <div className={`${classes.end} ${classes.row}`}>
                                    <Button onClick={handleDialogClickOpen} className={classes.purpleButton}>Add Item</Button>
                                    <Dialog open={dialogOpen} onClose={handleDialogClickOpen} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Add an Item</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText></DialogContentText>
                                            <AddItemForm />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleDialogClickClose} className={classes.redButton}>Cancel</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ItemDataTable />
                        </div>   
                    </Route>
                </Switch>
            </>

            ) : (
            <h1 className={`${classes.row} ${classes.center} ${classes.topMargin} ${classes.titleText}`}>Please log in to view your Stashes.</h1>
            )}
    </>
  )
}
