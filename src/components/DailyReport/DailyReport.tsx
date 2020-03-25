import React, { useState , useEffect } from 'react';
import { DailyReportItem } from '../../types';
import Covid19Api from '../../services/Covid19Api';
import './dailyReport.css';

const DailyReport: React.FC = () => {

    const [dailyReport, setDailyReport] = useState<Array<DailyReportItem> | undefined>(undefined);

    useEffect(() => {
        Covid19Api.getDailyReport()
            .then( response => setDailyReport(response))
    }, []);
    
    if (!dailyReport) {
        return null;
    }

    return (
            <table className="table-100">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Confirmed</th>
                        <th>Total confirmed</th>
                        <th>Total recovered</th>
                        <th>Total deaths</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dailyReport.map( (item, index) => {
                        return <tr key={index}>                         
                            <td>{item.day}</td>
                            <td>{item.dayConfirmed}</td>
                            <td>{item.confirmed}</td>
                            <td>{item.recovered}</td>
                            <td>{item.deaths}</td>
                        </tr>})
                    }
                </tbody>
            </table>
    );
} 

export default DailyReport;