import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from "recharts";

interface PieChartProps {
    data: ReadonlyArray<any>,
    dataKey: string
    midPie?: boolean,
    width?: number,
    height?: number,
    displayTooltip?: boolean
}

const defaultFillColor = "#9ea6ad";

const PieChartComponent: React.FC<PieChartProps> = ({ 
    data, 
    dataKey, 
    midPie = false,
    width = 400,
    height = 400,
    displayTooltip = true
}) => {

    const startAngle = midPie ? 180 : 360;
    return(
        <PieChart width={width} height={height}>
            <Pie 
                dataKey={dataKey} 
                startAngle={startAngle} 
                endAngle={0} 
                data={data} 
                cx={200} 
                cy={200} 
                outerRadius={80} 
                fill={defaultFillColor} 
                label>
                { data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />) }
            </Pie>
            { displayTooltip && <Tooltip /> }
        </PieChart>
    );
}

export default PieChartComponent;