import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useGetData } from '../../custom-hooks';
import { server_calls } from '../../api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
import { CreateStashForm } from '../CreateStashForm';
import { Link, useHistory } from 'react-router-dom';

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

const navigateToStash = ( row: any ) => {
  const url = `/stashes/${row.id}`;
  // const history = useHistory();
  // history.push({
  //   pathname: url,
  //   state: { stash_id: row.id }
  // })
  window.location.href = url
}

const useStyles = makeStyles({

})

export const DataTable = () => {

    let { stashData, getData } = useGetData();
    let [ open, setOpen ] = useState(false);
    const [ selectionModel, setSelectionModel ] = useState<string[]>( [] );
    const classes = useStyles();

    useEffect( () => {
      if ( selectionModel.length > 0 ) {
        localStorage.setItem('stash_id', selectionModel[0])
      }
    }, [selectionModel])

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
      <DataGrid 
      rows={ stashData } 
      columns={ columns } 
      pageSize={ 10 } 
      checkboxSelection={ true }
      getRowId={ ( row: any ) => row.stash_id }
      onRowClick={ (row: any) => navigateToStash( row )}
      onSelectionModelChange={ ( item: any ) => {
        setSelectionModel( item )
      }} />

      <Button onClick={ handleOpen }>Edit</Button>
      <Button onClick={ deleteData }>Delete</Button>

      <Dialog open={ open } onClose={ handleClose } aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText></DialogContentText>
          <CreateStashForm stash_id={ selectionModel! } />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
