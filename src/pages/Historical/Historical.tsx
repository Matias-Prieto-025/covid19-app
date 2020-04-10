import React, { useEffect, useState, useContext } from 'react';
import { DailyReportItem } from '../../types';
import covid19Api from '../../services/Covid19Api';
import { AppContextDispatch } from '../../App';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Table } from 'antd';

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

  return(
      <div>
          <PageTitle title="Historical data" />
          <Table 
            columns={columns} 
            dataSource={historicalData}
            size="small"
            pagination={{defaultPageSize: 20}} />
      </div>
  )
}

export default Historical;