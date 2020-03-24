import React, { useState, useEffect } from 'react';
import CardData from '../../components/CardData/CardData'; 
import Covid19Api from '../../services/Covid19Api';
import { SummaryResponse } from '../../types';

const covid19Api = new Covid19Api();
const initialSummaryResponse: SummaryResponse = {
  confirmed: 0,
  recovered: 0,
  deaths: 0,
  lastUpdate: undefined
}

const Home: React.FC = () => {

  const [ summaryData, setSummaryData] = useState<SummaryResponse>(initialSummaryResponse);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    covid19Api.summary()
        .then( result => {
            console.log(result)
            setSummaryData(result);
        })
        .catch(error => setError('An error occurred while fetching data'));
  }, [])

  if (error) {
    return <p>{ error }</p>
  }

  if (!summaryData) {
    return null;
  }

  return (
    <div className="flex flex-center-content">
      <CardData value={summaryData.confirmed} title={'Confimados'}/>
      <CardData value={summaryData.recovered} title={'Recuperados'}/>
      <CardData value={summaryData.deaths} title={'Fallecidos'}/>
    </div>
  );
} 

export default Home;