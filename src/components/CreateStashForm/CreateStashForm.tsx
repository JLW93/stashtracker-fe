import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import {chooseStashName } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

interface CreateStashFormProps {
    id?: string[];
    data?: {}
};

interface StashState {
    stash_name: string;
    date_modified: string;
};

export const CreateStashForm = ( props: CreateStashFormProps) => {

    const dispatch = useDispatch();
    const store = useStore();
    const name = useSelector<StashState>( state => state.stash_name);
    const { register, handleSubmit } = useForm( { } )

    const onSubmit = ( data: any, event: any ) => {
        if (props.id! && props.id.length > 0) {
            server_calls.updateStash( props.id[0]!, data);
            setTimeout ( () => { window.location.reload() }, 1000 );
            event.target.reset();
        } else {
            dispatch(chooseStashName(data.stash_name));
            server_calls.createStash(store.getState());
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
                <Button type="submit">Create Stash</Button>
                <Button type="reset">Cancel</Button>
            </form>
        </div>
    )
}