import React from 'react';
import { CountrySummary } from '../../types';
import { Row, Col, Table } from 'antd';
//import PieChar from '../../components/Charts/Pie/PieChart';

interface CompareSummaryProps {
    summaryOne?: CountrySummary
    summaryTwo?: CountrySummary
}

const CompareSummary: React.FC<CompareSummaryProps> = ({ summaryOne, summaryTwo }) => {

    const tableColumns = [
        { title: '', dataIndex: 'name'},
        { title: summaryOne && summaryOne.name, dataIndex: 'valueOne' },
        { title: summaryTwo && summaryTwo.name, dataIndex: 'valueTwo' },
    ];
    const tableData = [
        {
          key: '1',
          name: 'Confirmed',
          valueOne: summaryOne && summaryOne.confirmed,
          valueTwo: summaryTwo && summaryTwo.confirmed,
        },
        {
          key: '2',
          name: 'Recovered',
          valueOne: summaryOne && summaryOne.recovered,
          valueTwo: summaryTwo && summaryTwo.recovered,
        },
        {
          key: '3',
          name: 'Deaths',
          valueOne: summaryOne && summaryOne.deaths,
          valueTwo: summaryTwo && summaryTwo.deaths,
        }
    ];
    return (
        <>
            <hr/>
            <Row>
                <Col span={24}> 
                    <Table dataSource={tableData} columns={tableColumns} size="small" pagination={false} /> 
                </Col>
            </Row>
        </>
    );
}

export default CompareSummary;