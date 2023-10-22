import React, { useState, useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';


const DatatablePage = (props: any) => {
  const res = props.data;  
  const columnsProducts = props.columns;
  const rowsProducts: Array<any> = [];

  res.map((item: any) => {
    rowsProducts.push(item)
  })

  const newList: any = {
    columns: columnsProducts.columns,
    rows: rowsProducts
  }

  const [datatable, setDatatable]: any = useState(newList);

  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 20, 25]}
      entries={5}      
      data={newList}
      pagingTop
      searchTop
      responsive 
      searchBottom={false}
      
    />
  );
}

export default DatatablePage;