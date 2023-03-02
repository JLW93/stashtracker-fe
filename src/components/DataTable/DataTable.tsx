import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useGetData } from '../../custom-hooks';
import { server_calls } from '../../api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
import { AddItemForm } from '../AddItemForm';
// import { CreateStashForm } from '../CreateStashForm'

const columns: GridColDef[] = [
  { field: 'stash_id', headerName: 'Stash ID', width: 90, hide: true },
  { field: 'stash_name', headerName: 'Stash Name', flex: 1},
  { field: 'modified_date', headerName: 'Date Modified', flex: 1}
];

interface gridData {
  data: {
    id?: string
  }
}

const useStyles = makeStyles({

})

export const DataTable = () => {

    let { stashData, getData } = useGetData();
    let [ open, setOpen ] = useState(false);
    // let [ gridData, setData ] = useState<gridData>( { data: {} } );
    const [ selectionModel, setSelectionModel ] = useState<string[]>([]);
    const classes = useStyles();

    let handleOpen = () => {
      setOpen(true);
    };

    let handleClose = () => {
      setOpen(false);
    };

    let deleteData = () => {
      server_calls.deleteStash( selectionModel[0] );
      getData();
      setTimeout( () => { window.location.reload() }, 1000 );
    };

  return (
    <div style={ {  height: 400, width: '100%'} }>
      <DataGrid rows={ stashData } columns={ columns } pageSize={ 5 } checkboxSelection={ true }
      getRowId={ ( row: any ) => row.stash_id }
      onSelectionModelChange={ (item: any ) => {
        setSelectionModel( item )
      }} />

      <Button onClick={ handleOpen }>Edit</Button>
      <Button onClick={ deleteData }>Delete</Button>

      <Dialog open={ open } onClose={ handleClose } aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText></DialogContentText>
          <AddItemForm id={ selectionModel[0]! } />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
