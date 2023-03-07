import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import {chooseItemName, chooseItemType, chooseItemValue, choosePurchaseDate, chooseQuantity, chooseSerialNumber } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button, makeStyles } from '@material-ui/core';
import { stashId } from '../DataTable/stashId';
import { server_calls } from '../../api';

interface CreateItemFormProps {
    item_id?: string[];
    data?: {}
};

interface ItemState {
    item_name: string;
    item_type: string;
    item_value: string;
    purchase_date: string;
    serial_number: string;
    quantity: string;
};

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

export const AddItemForm = ( props: CreateItemFormProps) => {

    const dispatch = useDispatch();
    const store = useStore();
    const name = useSelector<ItemState>( state => state.item_name);
    const { register, handleSubmit } = useForm( { } )
    const classes = useStyles();

    const onSubmit = ( data: any, event: any ) => {
        console.log(props.item_id)
        console.log(data)
        if (props.item_id! && props.item_id.length > 0) {
            server_calls.updateStashItem( stashId || '', props.item_id[0]!, data);
            setTimeout ( () => { window.location.reload() }, 1000 );
            event.target.reset();
        } else {
            console.log(data)
            dispatch(chooseItemName(data.item_name));
            dispatch(chooseItemType(data.item_type));
            dispatch(chooseItemValue(data.item_value));
            dispatch(choosePurchaseDate(data.purchase_date));
            dispatch(chooseQuantity(data.quantity));
            dispatch(chooseSerialNumber(data.serial_number));
            server_calls.createStashItem(stashId || '', store.getState());
            setTimeout( () => { window.location.reload() }, 1000 )
        }
    }

    return (
        <div className={`${classes.row} ${classes.center}`}>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <div>
                    <div>
                        <label htmlFor="item_name">Item Name</label>
                        <Input { ...register('item_name') } name="item_name" placeholder="Item Name" />
                    </div>
                    <div>
                        <label htmlFor="item_type">Brand</label>
                        <Input { ...register('item_type') } name="item_type" placeholder="Brand" />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="item_value">Purchase Price</label>
                        <Input { ...register('item_value') } name="item_value" placeholder="Item Value" />
                    </div>
                    <div>
                        <label htmlFor="purchase_date">Purchase Date</label>
                        <Input { ...register('purchase_date') } name="purchase_date" placeholder="Purchase Date" />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="serial_number">Serial Number</label>
                        <Input { ...register('serial_number') } name="serial_number" placeholder="Serial Number" />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <Input { ...register('quantity') } name="quantity" placeholder="Quantity" />
                    </div>
                </div>
                <Button type="submit" className={classes.greenButton}>Submit</Button>
            </form>
        </div>
    )
}