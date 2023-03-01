import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        stash_name: 'Stash Name',
        item_name: 'Item Name',
        item_type: 'Brand',
        item_value: 'Purchase Price',
        purchase_date: 'Purchase Date',
        serial_number: 'Serial Number',
        quantity: 'Quantity',
    },
    reducers: {
        chooseStashName: ( state, action ) => { state.stash_name = action.payload },
        chooseItemName: ( state, action ) => { state.item_name = action.payload },
        chooseItemType: ( state, action ) => { state.item_type = action.payload },
        chooseItemValue: ( state, action ) => { state.item_value = action.payload },
        choosePurchaseDate: ( state, action ) => { state.purchase_date = action.payload},
        chooseSerialNumber: ( state, action ) => { state.serial_number = action.payload},
        chooseQuantity: ( state, action ) => { state.quantity = action.payload }
    }
});

export const reducer = rootSlice.reducer;
export const { chooseStashName, chooseItemName, chooseItemType, chooseItemValue, choosePurchaseDate, chooseSerialNumber, chooseQuantity } = rootSlice.actions;