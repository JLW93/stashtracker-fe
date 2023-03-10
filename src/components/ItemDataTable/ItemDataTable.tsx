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
  { field: 'item_value', headerName: 'Purchase Price', flex: 1 },
  { field: 'purchase_date', headerName: 'Purchase Date', flex: 1 },
  { field: 'serial_number', headerName: 'Serial Number', flex: 1 },
  { field: 'quantity', headerName: 'Quantity', flex: 1 },
  { field: 'stash_id', headerName: 'Stash ID', flex: 1, hide: true },
]

const useStyles = makeStyles({
  tableBackground: {
    background: 'rgba(51, 51, 51, 0.7)',
    border: 'none',
    borderRadius: '0px',
    width: '97%'
  },
  margin: {
    marginLeft: '25px',
    marginRight: '25px'
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
  tableText: {
    color: 'white',
    fontFamily: 'Nunito',
    fontWeight: 500,
    fontSize: '18px',
    textAlign: 'center'
  },
  radiusShadow: {
    borderRadius: '0px 0px 25px 25px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  tableButton: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '6px',
    marginLeft: '30px',
    marginBottom: '30px',
    fontFamily: 'Nunito',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: '18px'
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
    },
  },
  purpleButton: {
    background: '#7D5BA6',
    color: '#FFF',
    '&:hover': {
      background: '#6D4F92'
    }
  },
  paper: {
    background: 'rgba(51, 51, 51, 0.8)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px'
  },
  dialogSecondaryText: {
    fontFamily: 'Nunito',
    fontSize: '18px',
    color: '#FFF'
  },
  redButtonMargin: {
    marginBottom: '15px',
    marginRight: '15px',
  }
})

export const ItemDataTable = () => {
  
  let { stashItemData: itemData, getData } = useGetItemData(stashId || '');
  let [ editOpen, setEditOpen ] = useState(false);
  let [ priceOpen, setPriceOpen ] = useState(false);
  const [ selectionModel, setSelectionModel ] = useState<string[]>( [] );
  const [ priceChartingData, setPriceChartingData ] = useState<any>(null)
  const [ values, setValues ] = useState({
    item_name: '',
    item_type: '',
    item_value: '',
    purchase_date: '',
    serial_number: '',
    quantity: ''
  })

  let [ formData, setFormData ] = useState({
    item_name: '',
    item_type: '',
    item_value: '',
    purchase_date: '',
    serial_number: '',
    quantity: '',
  });

  const classes = useStyles();

  useEffect( () => {
    console.log(priceChartingData)
  }, [priceChartingData])

  useEffect( () => {
    if (formData) {
      setValues( {
        ...values,
        item_name: formData.item_name,
        item_type: formData.item_type,
        item_value: formData.item_value,
        purchase_date: formData.purchase_date,
        serial_number: formData.serial_number,
        quantity: formData.quantity
      });
    }
  }, [formData])

  let handlePriceChartingData = async () => {
    const data = await server_calls.getStashItem(stashId || '', selectionModel[0])
    // console.log(data)

    let itemName = data['item_name']
    const priceData = await server_calls.getPriceData(itemName);
    // console.log(priceData)
    const newPriceData = {
        consoleName: priceData['console-name'],
        id: priceData['id'],
        loosePrice: priceData['loose-price'],
        productName: priceData['product-name'],
        status: priceData['status']
    };

    setPriceOpen(true);
    setPriceChartingData(newPriceData);
  };

  let handleEditOpen = async () => {
    const currentData = await server_calls.getStashItem(stashId || '', selectionModel[0]);
    setFormData(currentData);
    setEditOpen(true);
    
  };

  let handleClose = () => {
    setEditOpen(false);
    setPriceOpen(false);
    setPriceChartingData(null);
  };

  let deleteData = () => {
    server_calls.deleteStashItem( stashId || '', selectionModel[0] );
    getData(stashId || '');
    setTimeout( () => { window.location.reload() }, 1000 );
  };

  return (
    <>
      <div style={ {  height: 792, width: "98%"} } className={`${classes.margin} ${classes.col}`}>
        <DataGrid 
          rows={ itemData } 
          columns={ columns } 
          pageSize={ 10 } 
          checkboxSelection={ true } 
          getRowId={ (row) => row.item_id}
          onSelectionModelChange={ ( item: any ) => {
          setSelectionModel( item )
          }} 
          className={`${classes.tableBackground} ${classes.tableText}`} />

        <div className={`${classes.radiusShadow} ${classes.tableBackground}`}>
          <Button onClick={ handleEditOpen } className={`${classes.tableButton} ${classes.greenButton}`}>Edit</Button>
          <Button onClick={ deleteData } className={`${classes.tableButton} ${classes.redButton}`}>Delete</Button>
          <Button onClick={ handlePriceChartingData } className={`${classes.tableButton} ${classes.purpleButton}`}>PriceCharting Data</Button>
        </div>
        <Dialog classes={{ paper: classes.paper }} open={ editOpen } onClose={ handleClose } aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogContentText></DialogContentText>
            <AddItemForm item_id={ selectionModel! } formData={ formData } />
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleClose } className={`${classes.redButton} ${classes.redButtonMargin}`}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <Dialog classes={{ paper: classes.paper }} open={ priceChartingData !== null } onClose={ handleClose } aria-labelledby="price-charting-dialog-title">
          <DialogContent>
            <DialogContentText classes={{ root: classes.dialogSecondaryText }}>PriceCharting Data</DialogContentText>
            { priceChartingData &&
              <DialogContent>
                <PriceCharting data={priceChartingData} />
              </DialogContent>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleClose } className={`${classes.redButton} ${classes.redButtonMargin}`}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}