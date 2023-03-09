import React, { useState, useEffect } from 'react';
import { server_calls } from '../../api';
import { Navbar } from '../Navbar';
import { token } from '../../api/token';
import { ChangePasswordForm } from '../ChangePasswordForm';
import { Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions, 
    makeStyles} from '@material-ui/core';

    const useStyles = makeStyles({
        paper: {
            background: 'rgba(51, 51, 51, 0.8)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '20px'
        },
        redButton: {
            background: '#CD4242',
            color: '#333',
            '&:hover': {
                background: '#C13333'
            },
        },
        redButtonMargin: {
            marginBottom: '15px',
            marginRight: '15px',
        },
        greenButton: {
            background: '#89CE94',
            color: '#FFF',
            '&:hover': {
              background: '#6FC37D'
            }
        },
        purpleButton: {
            background: '#7D5BA6',
            color: '#FFF',
            '&:hover': {
                background: '#6D4F92'
            },
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
        topMargin: {
            marginTop: '50px'
        }
    })

export const Account = () => {

    const classes = useStyles();
    const [ user, setUser ] = useState({ email: '', first_name: '', last_name: '' });
    let [ open, setOpen ] = useState(false)

    let getUserInfo = async () => {
        const userInfo = await server_calls.getUserData()
        console.log(userInfo)
        return userInfo
    }

    useEffect( () => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserInfo();
                setUser(userData);
            } catch (error) {
                console.error(error)
            }
        }
        fetchUserData();
    }, [])

    let handleOpen = () => {
        setOpen(true)
    };

    let handleClose = () => {
        setOpen(false)
    };

  return (
    <>
        <Navbar />
        <div className={`${classes.col} ${ classes.center} ${classes.topMargin}`}>
            {/* <table>
                <tbody>
                    <tr>
                        <td>Email:</td>
                        <td>{ user.email }</td>
                    </tr>
                    <tr>
                        <td>First Name:</td>
                        <td>{ user.first_name }</td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>{ user.last_name }</td>
                    </tr>
                </tbody>
            </table> */}
            <h1 className={classes.titleText}>Currently logged in as <span className={classes.purpleText}>{ user.email }</span></h1>
        </div>
        <div className={`${classes.col} ${ classes.center} ${classes.topMargin}`}>
            <div>
                <Button onClick={ handleOpen } className={classes.purpleButton}>Change Password</Button>
            </div>
            <Dialog classes={{ paper: classes.paper }} open={ open } onClose={ handleClose } aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogContentText></DialogContentText>
            <ChangePasswordForm token={ token! } />
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleClose } className={`${classes.redButton} ${classes.redButtonMargin}`}>Cancel</Button>
          </DialogActions>
        </Dialog>
        </div>
    </>
  )
}
