import React from 'react';

interface TableHeadProps {
    columns: Array<string>
}
const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
    return (
        <thead>
            <tr>
                { columns.map( column => <th key={`title-${column}`}>{ column }</th>)}
            </tr>
        </thead>
    )
} 

export default TableHead;