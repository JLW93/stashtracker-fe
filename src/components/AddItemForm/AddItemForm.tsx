import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import {chooseItemName, chooseItemType, chooseItemValue, choosePurchaseDate, chooseQuantity, chooseSerialNumber } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

interface CreateItemFormProps {
    id?: string;
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

export const AddItemForm = ( props: CreateItemFormProps) => {

    const dispatch = useDispatch();
    const store = useStore();
    const name = useSelector<ItemState>( state => state.item_name);
    const { register, handleSubmit } = useForm( { } )

    const onSubmit = ( data: any, event: any ) => {
        if (props.id! && props.id.length > 0) {
            server_calls.updateStashItem( props.id[0]!, data);
            setTimeout ( () => { window.location.reload() }, 1000 );
            event.target.reset();
        } else {
            dispatch(chooseItemName(data.item_name));
            dispatch(chooseItemType(data.item_type));
            dispatch(chooseItemValue(data.item_value));
            dispatch(choosePurchaseDate(data.purchase_date));
            dispatch(chooseQuantity(data.quantity));
            dispatch(chooseSerialNumber(data.serial_number));
            server_calls.createStashItem(store.getState());
            setTimeout( () => { window.location.reload() }, 1000 )
        }
    }

    return (
        <div>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <div>
                    <label htmlFor="item_name">Item Name</label>
                    <Input { ...register('item_name') } name="item_name" placeholder="Item Name" />
                </div>
                <div>
                    <label htmlFor="item_type">Brand</label>
                    <Input { ...register('sitem_type') } name="item_type" placeholder="Brand" />
                </div>
                <div>
                    <label htmlFor="item_value">Purchase Price</label>
                    <Input { ...register('item_value') } name="item_value" placeholder="Item Value" />
                </div>
                <div>
                    <label htmlFor="purchase_date">Purchase Date</label>
                    <Input { ...register('purchase_date') } name="purchase_date" placeholder="Purchase Date" />
                </div>
                <div>
                    <label htmlFor="serial_number">Serial Number</label>
                    <Input { ...register('serial_number') } name="serial_number" placeholder="Serial Number" />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <Input { ...register('quantity') } name="quantity" placeholder="Quantity" />
                </div>
                <Button type="submit">Create Item</Button>
                <Button type="reset">Cancel</Button>
            </form>
        </div>
    )
}