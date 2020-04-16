import React, { useEffect, useState, useContext } from 'react';
import { DailyReportItem } from '../../types';
import covid19Api from '../../services/Covid19Api';
import { AppContextDispatch } from '../../App';
import PageTitle from '../../components/PageTitle/PageTitle';
import LineChart from '../../components/Charts/Line/LineChart';
import { Row, Col, Table, Tabs } from 'antd';
import { LineChartOutlined, TableOutlined } from '@ant-design/icons'

const { TabPane } = Tabs;

const tabChartTitle = (<span>
                        <LineChartOutlined />
                        Chart
                      </span>);

const tabTableTile = (<span>
                      <TableOutlined />
                      Table
                    </span>);

const chartLines = [
  {dataKey: "confirmed", color: "#d1aa8c"},
  {dataKey: "recovered", color: "#7bd89a"},
  {dataKey: "deaths", color: "#ffaaab"}
]

const Historical: React.FC = () => {

  const columns = [
    {title: 'Day', dataIndex: 'day', key: 'day'}, 
    {title: 'Confirmed', dataIndex: 'confirmed', key: 'confirmed'}, 
    {title: 'Recovered', dataIndex: 'recovered', key: 'recovered'}, 
    {title: 'Deaths', dataIndex: 'deaths', key: 'deaths'}
  ];

  const [historicalData, setHistoricalData] = useState<Array<DailyReportItem>>([]);
  const appContextDispatch = useContext(AppContextDispatch);

  useEffect(() => {
      covid19Api.getHistoricalData()
          .then(response => {
            setHistoricalData(response.map(item => { 
              return {...item, key: item.day}
            }));
          })
          .catch(error => appContextDispatch({ type: 'SET_ERROR', error}));  
  }, [appContextDispatch]);

  if (!historicalData) {
      return null;
  }
  const reversed = historicalData.slice().reverse();



  return(
      <div className="page-main-content">
        <Row gutter={[16, 32]}>
          <Col span={24}>
              <PageTitle title="Historical data" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" size="small" type="card" style={{ marginBottom: 32 }}>
              <TabPane tab={tabChartTitle} key="1">
                <LineChart 
                  data={reversed}
                  xAxisKey="day"
                  lines={chartLines} />
              </TabPane>
              <TabPane tab={tabTableTile} key="2">
                <Table 
                  columns={columns} 
                  dataSource={historicalData}
                  size="small"
                  pagination={{defaultPageSize: 20}} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
  )
}

export default Historical;