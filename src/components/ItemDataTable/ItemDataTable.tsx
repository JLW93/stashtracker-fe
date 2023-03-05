import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { server_calls } from '../../api';
import { useParams } from 'react-router-dom';

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

interface Item {
  item_id?: string;
  item_name: string;
  item_type: string;
  item_value: string;
  purchase_date: string;
  serial_number: string;
  quantity: number;
  stash_id: string;
}

export const ItemDataTable = () => {
  const { stash_id } = useParams<{ stash_id:string }>();
  const [ items, setItems ] = useState<Item[]>( [] );

const fetchItems = async ( stash_id: string ) => {
  const response = await fetch(`http://127.0.0.1:5000/stashes/${stash_id}/items`);
  const data = await response.json();
  console.log(data)
  setItems(data)
}

  useEffect( () => {
    fetchItems(stash_id);
  }, [stash_id]);

  return (
    <div style={ { height: 400, width: '100%' } }>
      <DataGrid rows={ items } columns={ columns } pageSize={ 10 } />      
    </div>
  )
}