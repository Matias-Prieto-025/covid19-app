import React from 'react';

interface TableBodyProps {
    data: Array<any>
    accessors: Array<string>
}

const TableBody: React.FC<TableBodyProps> = ({ data, accessors}) => {
  return(
    <tbody>
      {
        data.map((row: any, index: number) => <tr key={`row-${index}`}>
            {
              accessors.map((accessor, index) => <td key={`cell-${index}`}>{row[accessor]}</td>)
            }
          </tr>
        ) 
      }
    </tbody>
  ) 
}

export default TableBody;