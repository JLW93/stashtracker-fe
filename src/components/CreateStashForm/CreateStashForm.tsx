import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import {chooseStashName } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

interface CreateStashFormProps {
    stash_id?: string[];
    data?: {}
};

interface StashState {
    stash_name: string;
};

export const CreateStashForm = ( props: CreateStashFormProps) => {

    const dispatch = useDispatch();
    const store = useStore();
    const name = useSelector<StashState>( state => state.stash_name);
    const { register, handleSubmit } = useForm( { } )

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
                {/* <div>
                    <label htmlFor="date_modified">Date Modified</label>
                    <Input { ...register('date_modified') } name="date_modified" placeholder="Date Modified" />
                </div> */}
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}