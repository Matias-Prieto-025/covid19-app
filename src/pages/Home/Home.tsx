import React, { useEffect, useReducer } from 'react';
import CardData from '../../components/CardData/CardData'; 
import { summaryReducer, initialSummaryState } from '../../state/summary/reducer';
import Covid19Api from '../../services/Covid19Api';

const covid19Api = new Covid19Api();


const Home: React.FC = () => {

  const [sumamryState, summaryDispatch] = useReducer(summaryReducer, initialSummaryState)

  useEffect(() => {
    covid19Api.summary()
        .then( result => summaryDispatch({ type: 'SET_SUMMARY', summary: result}))
        .catch(error => summaryDispatch({ type: 'SET_ERROR', error: 'An error occurred while fetching summary' }));
    covid19Api.getCountries()
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }, [])

  if (!sumamryState.summary) {
    return null;
  }

  const { summary, error } = sumamryState;

  if (error) {
    return <p>{ error }</p>
  }


  return (
    <div className="flex flex-center-content">
      <CardData value={summary.confirmed} title={'Confimados'}/>
      <CardData value={summary.recovered} title={'Recuperados'}/>
      <CardData value={summary.deaths} title={'Fallecidos'}/>
    </div>
  );
} 

export default Home;