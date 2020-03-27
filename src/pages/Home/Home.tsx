import React, { useContext } from 'react';
import { Row } from '../../layout-components';
import CardData from '../../components/CardData/CardData'; 
import DailyReport from '../../components/DailyReport/DailyReport';
import { SummaryContexState } from '../../App';

const calculateRate = (confirmed: number, value: number): string => { 
  return (confirmed > 0 && (value*100/confirmed).toFixed(2)) || '0'
}

const Home: React.FC = () => {

  const summaryContextSatet = useContext(SummaryContexState);

  if (!summaryContextSatet.summary) {
    return null;
  }

  const { summary: {confirmed, recovered, deaths}, error } = summaryContextSatet;

  if (error) {
    return <p>{ error }</p>
  }


  return (
    <>
      <Row className="mobile-column">
        <CardData 
          value={confirmed} 
          title={'Confirmed'}
          className="background-yellow"/>
        <CardData 
          value={recovered} 
          title={'Recovered'} 
          rate={calculateRate(confirmed, recovered)}
          className="background-green"/>
        <CardData 
          value={deaths} 
          title={'Deaths'} 
          rate={calculateRate(confirmed, deaths)}
          className="background-red"/>
      </Row>
     
      <div className="flex-row flex-center-content">
        <DailyReport />
      </div>
    </>
  );
} 

export default Home;