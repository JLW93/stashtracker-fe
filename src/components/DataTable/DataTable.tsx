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
  window.location.href = url
}

const useStyles = makeStyles({
  tableBackground: {
    background: 'rgba(51, 51, 51, 0.7)',
    borderRadius: '0px',
    border: 'none',
    width: '97%'
  },
  margin: {
    marginLeft: '25px',
    marginRight: '50px',
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
    }
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
dialogTitleText: {
    fontFamily: 'Nunito',
    fontWeight: 800,
    fontSize: '36px',
    color: '#FFF',
    marginTop: '25px',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    textAlign: 'center'
  },
  redButtonMargin: {
    marginBottom: '15px',
    marginRight: '15px',
  }
})

export const DataTable = () => {

    let { stashData, getData } = useGetData();
    let [ open, setOpen ] = useState(false);
    const [ selectionModel, setSelectionModel ] = useState<string[]>( [] );
    const [ width, setWidth ] = useState(window.innerWidth);
    const classes = useStyles();

    useEffect( () => {
      if ( selectionModel.length > 0 ) {
        localStorage.setItem('stash_id', selectionModel[0])
      }
    }, [selectionModel]);

    useEffect( () => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize)
    }, [])

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
    <>
      <div style={ {  height: 792, width: "98%"} } className={`${classes.margin} ${classes.col}`}>
        <DataGrid 
        rows={ stashData } 
        columns={ columns } 
        pageSize={ 10 } 
        checkboxSelection={ true }
        getRowId={ ( row: any ) => row.stash_id }
        onRowClick={ (row: any) => navigateToStash( row )}
        onSelectionModelChange={ ( item: any ) => {
          setSelectionModel( item )
        }} 
        className={`${classes.tableBackground} ${classes.tableText}`} />
        
        <div className={`${classes.radiusShadow} ${classes.tableBackground}`}>
          <Button onClick={ handleOpen } className={`${classes.tableButton} ${classes.greenButton}`}>Edit</Button>
          <Button onClick={ deleteData } className={`${classes.tableButton} ${classes.redButton}`}>Delete</Button>
        </div>

        <Dialog classes={{ paper: classes.paper }} open={ open } onClose={ handleClose } aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogContentText></DialogContentText>
            <CreateStashForm stash_id={ selectionModel! } />
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleClose } className={`${classes.redButton} ${classes.redButtonMargin}`}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
