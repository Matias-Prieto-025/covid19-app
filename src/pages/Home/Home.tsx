import React, { useEffect, useReducer } from 'react';
import CardData from '../../components/CardData/CardData'; 
import { summaryReducer, initialSummaryState } from '../../state/summary/reducer';
import Covid19Api from '../../services/Covid19Api';

const covid19Api = new Covid19Api();

const calculateRate = (confirmed: number, value: number): string => { 
  return (value*100/confirmed).toFixed(2)
}

const Home: React.FC = () => {

  const [sumamryState, summaryDispatch] = useReducer(summaryReducer, initialSummaryState)

  useEffect(() => {
    
    covid19Api.summary()
        .then( result => summaryDispatch({ type: 'SET_SUMMARY', summary: result}))
        .catch(error => summaryDispatch({ type: 'SET_ERROR', error: 'An error occurred while fetching summary' }));
    
    covid19Api.getCountries()
      .then(result => console.log(result))
      .catch(error => console.log(error));

    covid19Api.getDailyReport()
      .then(result => console.log(result))
      .catch(error => console.log(error));

  }, [])

  if (!sumamryState.summary) {
    return null;
  }

  const { summary: {confirmed, recovered, deaths}, error } = sumamryState;

  if (error) {
    return <p>{ error }</p>
  }


  return (
    <div className="flex flex-center-content">
      <CardData value={confirmed} title={'Confirmed'}/>
      <CardData value={recovered} title={'Recovered'} rate={calculateRate(confirmed, recovered)}/>
      <CardData value={deaths} title={'Deaths'} rate={calculateRate(confirmed, deaths)}/>
    </div>
  );
} 

export default Home;