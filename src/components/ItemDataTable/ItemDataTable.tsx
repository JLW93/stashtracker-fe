import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useParams } from 'react-router-dom';
import { Button, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  Dialog, 
  makeStyles,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody } from '@material-ui/core';

import { server_calls } from '../../api';
import { useGetItemData } from '../../custom-hooks';
import { AddItemForm } from '../AddItemForm';
import { stashId } from '../DataTable/stashId';
import { PriceCharting } from '../PriceCharting';

const columns: GridColDef[] = [
  { field: 'item_id', headerName: 'Item ID', width: 90, hide: true },
  { field: 'item_name', headerName: 'Item Name', flex: 1 },
  { field: 'item_type', headerName: 'Item Type', flex: 1 },
  { field: 'item_value', headerName: 'Item Value', flex: 1 },
  { field: 'purchase_date', headerName: 'Purchase Date', flex: 1 },
  { field: 'serial_number', headerName: 'Serial Number', flex: 1 },
  { field: 'quantity', headerName: 'Quantity', flex: 1 },
  { field: 'stash_id', headerName: 'Stash ID', flex: 1, hide: true },
]

const useStyles = makeStyles({

});

export const ItemDataTable = () => {
  
  let { stashItemData: itemData, getData } = useGetItemData(stashId || '');
  let [ open, setOpen ] = useState(false);
  const [ selectionModel, setSelectionModel ] = useState<string[]>( [] );
  const [ priceChartingData, setPriceChartingData ] = useState<any>(null)
  const classes = useStyles();

  

  let handlePriceChartingData = async () => {
    // console.log(selectionModel)
    const data = await server_calls.getStashItem(stashId || '', selectionModel[0])
    // console.log(data)

    let itemName = data['item_name']
    const priceData = await server_calls.getPriceData(itemName);
    // console.log(priceData)

    setOpen(true);
    setPriceChartingData(priceData);
  };

  useEffect( () => {
    console.log(priceChartingData)
  }, [priceChartingData])

  let handleOpen = () => {
    setOpen(true);
  };

  let handleClose = () => {
    setOpen(false);
  };

  let deleteData = () => {
    server_calls.deleteStashItem( stashId || '', selectionModel[0] );
    getData(stashId || '');
    setTimeout( () => { window.location.reload() }, 1000 );
  };

  return (
    <div style={ { height: 400, width: '100%' } }>
      <DataGrid rows={ itemData } columns={ columns } pageSize={ 10 } checkboxSelection={ true } getRowId={ (row) => row.item_id}
      onSelectionModelChange={ ( item: any ) => {
        setSelectionModel( item )
      }} />

      <Button onClick={ handleOpen }>Edit</Button>
      <Button onClick={ deleteData }>Delete</Button>
      <Button onClick={ handlePriceChartingData }>PriceCharting Data</Button>

      <Dialog open={ open } onClose={ handleClose } aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText></DialogContentText>
          <AddItemForm item_id={ selectionModel! } />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={ priceChartingData !== null } onClose={ handleClose } aria-labelledby="price-charting-dialog-title">
        <DialogContent>
          <DialogContentText>PriceCharting Data</DialogContentText>
            <DialogContent>
              <PriceCharting data={priceChartingData} />
            </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}