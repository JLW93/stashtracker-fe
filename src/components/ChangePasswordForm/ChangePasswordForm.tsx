import React from 'react';
import { makeStyles, Button } from '@material-ui/core'
import { Input } from '../SharedComponents'
import { useForm } from 'react-hook-form';
import { server_calls } from '../../api';

interface ChangePasswordFormProps {
    token: string;
    data?: {}
}

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
    greenButton: {
        background: '#89CE94',
        color: '#FFF',
        '&:hover': {
          background: '#6FC37D'
        },
        marginTop: '15px',
        marginLeft: '10px'
      },
      redButton: {
        background: '#CD4242',
        color: '#333',
        '&:hover': {
          background: '#C13333'
        }
      },
      text: {
        fontSize: '18px',
        fontFamily: 'Nunito',
        color: '#FFF',
        marginLeft: '10px'
    },
    warningText: {
        fontSize: '14px',
        color: '#CD4242',
        fontWeight: 800
    }
});

export const ChangePasswordForm = ( props: ChangePasswordFormProps) => {

    const classes = useStyles();
    const { register, handleSubmit } = useForm( { } )

    const onSubmit = async ( data: any ) => {
        console.log(data)
        try{
            const response = await server_calls.updateUserPassword(props.token, data)
            console.log(response);
            setTimeout ( () => { window.location.reload() }, 1000 );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`${classes.row} ${classes.center}`}>
                <form onSubmit={ handleSubmit( onSubmit ) }>
                    <div>
                        <div>
                            <label htmlFor="old_password" className={`${classes.text}`}>Current Password</label>
                            <Input { ...register('old_password', {required: true}) } name="old_password" type="password" />
                        </div>
                        <div>
                            <label htmlFor="new_password" className={`${classes.text}`}>New Password</label>
                            <Input { ...register('new_password', {required: true}) } name="new_password" type="password" />
                        </div>
                    </div>
                    <Button type="submit" className={classes.greenButton}>Submit</Button>
                </form>
            </div>
    )
}
