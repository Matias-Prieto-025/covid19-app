import React from 'react';
import TableHead from './TableHeada';
import TableBody from './TableBody'
import './table.css';

interface ColumnItem {
  title: string,
  accessor: string
}
  
interface TableProps {
  columns: Array<ColumnItem>,
  data: Array<any>
}

const getColumnTitles = (columns: Array<ColumnItem>) => {
  return columns.map( item => item.title );
}

const getColumnAccessors = (columns: Array<ColumnItem>) => {
  return columns.map( item => item.accessor );
}

const Table: React.FC<TableProps> = ({ columns, data }) => {

  if (!data) {
    return <p>Empty table</p>  
  }

  return (
    <table className="table">
        <TableHead columns={getColumnTitles(columns)} />
        <TableBody data={data} accessors={getColumnAccessors(columns)} />
    </table>
  )
}

export default Table;