import React, { useEffect, useState } from 'react';
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
  itemPerPage?: number
}

const getColumnTitles = (columns: Array<ColumnItem>) => columns.map( item => item.title );
const getColumnAccessors = (columns: Array<ColumnItem>) => columns.map( item => item.accessor );
const calculatePagesQuantity = (data: Array<any>, itemPerPage: number): number => Math.ceil(data.length / itemPerPage)
const loadPageDate = (page: number, data: Array<any>) => {

}

const Table: React.FC<TableProps> = ({ columns, data, itemPerPage = 30 }) => {

  const [pages, setPages] = useState<Array<number>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const cantPages = calculatePagesQuantity(data, itemPerPage);
    const pagesArray = Array.from({ length: cantPages }, (v, k) => k+1 )
    setPages(pagesArray);
  }, [data, itemPerPage])

  useEffect(() => {
    loadPageDate(currentPage, data);
  }, [currentPage, data])

  if (!data) {
    return <p>Empty table</p>  
  }

  return (
    <>
      <table className="table">
          <TableHead columns={getColumnTitles(columns)} />
          <TableBody data={data} accessors={getColumnAccessors(columns)} />
      </table>
      { pages.map( page => <button key={`table-page-${page}`} onClick={() => setCurrentPage(page)}>{page}</button>) }
    </>
  )
}

export default Table;