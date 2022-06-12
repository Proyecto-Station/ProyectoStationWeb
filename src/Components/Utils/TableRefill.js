import React from 'react'

import { DataGrid } from '@mui/x-data-grid'

function TableRefill({ columns, rows }) {
  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{
            height: 400,
            width: '100%'
          }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'asc' }],
          },
        }}
      />
    </>
  )
}

export default TableRefill
