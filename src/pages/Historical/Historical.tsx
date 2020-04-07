import React, { useEffect, useState, useContext } from 'react';
import { DailyReportItem } from '../../types';
import covid19Api from '../../services/Covid19Api';
import { AppContextDispatch } from '../../App';
import Table from '../../components/Table/Table';

const Historical: React.FC = () => {

  const columns = [
    {title: 'Day', accessor: 'day'}, 
    {title: 'Confirmed', accessor: 'confirmed'}, 
    {title: 'Recovered', accessor: 'recovered'}, 
    {title: 'Deaths', accessor: 'deaths'}
  ];

  const [historicalData, setHistoricalData] = useState<Array<DailyReportItem>>([]);
  const appContextDispatch = useContext(AppContextDispatch);

  useEffect(() => {
      covid19Api.getHistoricalData()
          .then(response => setHistoricalData(response))
          .catch(error => appContextDispatch({ type: 'SET_ERROR', error}));
  }, [appContextDispatch]);

  if (!historicalData) {
      return null;
  }

  return(
      
      <div>
          { historicalData && <Table 
                                columns={columns} 
                                data={historicalData} />
          }
      </div>
  )
}

export default Historical;