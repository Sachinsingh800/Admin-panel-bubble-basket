import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Order ID', width: 90 },
  {
    field:'Customer',
    headerName: 'Customer',
    width: 150,
    editable: true,
  },
  {
    field:  'Status',
    headerName: 'Status',
    width: 150,
    editable: true,
  },
  {
    field: 'DateAdded',
    headerName: 'Date Added',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'Total',
    headerName: 'Total',
    type: 'number',
    width: 110,
    editable: true,
  },

];

const rows = [
  { id: 1, Status: 'Pending', Customer: 'Jon', Total: 35 ,DateAdded:"02/08/2023"},
  { id: 2, Status: 'Pending', Customer: 'Cersei', Total: 42 ,DateAdded:"02/08/2023" },
  { id: 3, Status: 'Pending', Customer: 'Jaime', Total: 45 ,DateAdded:"02/08/2023" },
  { id: 4, Status: 'Pending', Customer: 'Arya', Total: 16 ,DateAdded:"02/08/2023" },
  { id: 5, Status: 'Pending', Customer: 'Daenerys', Total: null  ,DateAdded:"02/08/2023"},
  { id: 6, Status: 'Pending', Customer: 'sachin', Total: 150 ,DateAdded:"02/08/2023" },
  { id: 7, Status: 'Pending', Customer: 'Ferrara', Total: 44 ,DateAdded:"02/08/2023" },
  { id: 8, Status: 'Pending', Customer: 'Rossini', Total: 36 ,DateAdded:"02/08/2023" },
  { id: 9, Status: 'Pending', Customer: 'Harvey', Total: 65 ,DateAdded:"02/08/2023" },
];

export default function PaymentDataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
