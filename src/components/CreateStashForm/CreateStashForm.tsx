import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import {chooseStashName } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button, makeStyles } from '@material-ui/core';

import { server_calls } from '../../api';

interface CreateStashFormProps {
    stash_id?: string[];
    data?: {}
};

interface StashState {
    stash_name: string;
};

const useStyles = makeStyles({
    dialogBackground: {
        background: 'rgba(51, 51, 51, 0.9)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '20px'
    },
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
})

export const CreateStashForm = ( props: CreateStashFormProps) => {

    const dispatch = useDispatch();
    const store = useStore();
    const name = useSelector<StashState>( state => state.stash_name);
    const { register, handleSubmit } = useForm( { } )
    const classes = useStyles();

    const onSubmit = ( data: any, event: any ) => {
        if (props.stash_id! && props.stash_id.length > 0) {
            server_calls.updateStash( props.stash_id[0]!, data);
            setTimeout ( () => { window.location.reload() }, 1000 );
            event.target.reset();
        } else {
            console.log(data)
            console.log(data.stash_name)
            dispatch(chooseStashName(data.stash_name));
            server_calls.createStash(store.getState());
            console.log(store.getState())
            setTimeout( () => { window.location.reload() }, 1000 )
        }
    }

    return (
        <div>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <div>
                    <label htmlFor="stash_name">Stash Name</label>
                    <Input { ...register('stash_name') } name="stash_name" placeholder="Stash Name" />
                </div>
                <Button type="submit" className={classes.greenButton}>Submit</Button>
            </form>
        </div>
    )
}