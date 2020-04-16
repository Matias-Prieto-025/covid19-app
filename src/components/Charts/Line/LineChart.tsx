import React from 'react';
import { 
    CartesianGrid, 
    Legend,
    Line, 
    LineChart, 
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis
} from 'recharts';

interface LineProp {
    dataKey: string,
    color: string
}

interface LineChartProps {
    data: ReadonlyArray<object>,
    xAxisKey: string,
    lines: Array<LineProp>,
    displayTooltip?: boolean,
    containerWidth?: number | string,
    containerHeight?: number | string,
}

const LineChartComponent: React.FC<LineChartProps> = ({ 
    data, 
    lines, 
    xAxisKey,
    displayTooltip = true, 
    containerWidth = '100%',
    containerHeight = 400
}) => {
    return(
        <ResponsiveContainer width={containerWidth} height={containerHeight}>
            <LineChart data={data} margin={{ bottom: 40}}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey={xAxisKey}  angle={-80} textAnchor="end"/>
                <YAxis angle={-45} />
                { displayTooltip && <Tooltip /> }
                <Legend verticalAlign="top" />
                { lines.map( line => <Line 
                                        key={`chart-line-${line.dataKey}`} 
                                        type="monotone" 
                                        dataKey={line.dataKey} 
                                        stroke={line.color}  
                                        dot={false}/>
                )}
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineChartComponent;