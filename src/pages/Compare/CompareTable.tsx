import React from 'react';
import { CountrySummary } from '../../types';
import { Row, Col, Table } from 'antd';

// TODO: refactor this component

interface CompareSummaryProps {
    summaryOne?: CountrySummary
    summaryTwo?: CountrySummary
    summaryThree?: CountrySummary
}

const CompareSummary: React.FC<CompareSummaryProps> = ({ summaryOne, summaryTwo, summaryThree }) => {

    const tableColumns = [
        { title: '', dataIndex: 'name'},
        { title: summaryOne && summaryOne.name, dataIndex: 'valueOne' },
        { title: summaryTwo && summaryTwo.name, dataIndex: 'valueTwo' },
        { title: summaryThree && summaryThree.name, dataIndex: 'valueThree' },

    ];
    const tableData = [
        {
          key: '1',
          name: 'Confirmed',
          valueOne: summaryOne && summaryOne.confirmed.toLocaleString(),
          valueTwo: summaryTwo && summaryTwo.confirmed.toLocaleString(),
          valueThree: summaryThree && summaryThree.confirmed.toLocaleString()
        },
        {
          key: '2',
          name: 'Recovered',
          valueOne: summaryOne && summaryOne.recovered.toLocaleString(),
          valueTwo: summaryTwo && summaryTwo.recovered.toLocaleString(),
          valueThree: summaryThree && summaryThree.recovered.toLocaleString()
        },
        {
          key: '3',
          name: 'Deaths',
          valueOne: summaryOne && summaryOne.deaths.toLocaleString(),
          valueTwo: summaryTwo && summaryTwo.deaths.toLocaleString(),
          valueThree: summaryThree && summaryThree.deaths.toLocaleString()
        }
    ];

    return (
        <>
            <Row justify="center">
                <Col sm={20} xs={24}> 
                    <Table dataSource={tableData} columns={tableColumns} size="small" pagination={false} /> 
                </Col>
            </Row>
        </>
    );
}

export default CompareSummary;