import React from 'react';
import './row.css'

interface RowProps {
    className?: string
}

const Row: React.FC<RowProps> = ({children, className = undefined}) => (
    <div className={`flex-row ${className}`}> 
        { children }
    </div>
)

export default Row;