import React, { useContext, useState } from 'react';
import ReactTooltip from "react-tooltip";
import { Row } from '../../layout-components';
import CardData from '../../components/CardData/CardData'; 
import MapChart, { HoverMapValue } from '../../components/MapChart/MapChart';
import { SummaryContexState } from '../../App';

const calculateRate = (confirmed: number, value: number): string => { 
  return (confirmed > 0 && (value*100/confirmed).toFixed(2)) || '0'
}

const Home: React.FC = () => {

  const [ tooltipState, setTooltipState] = useState<string>('')
  const summaryContextSatet = useContext(SummaryContexState);

  if (!summaryContextSatet.summary) {
    return null;
  }

  const { summary: {confirmed, recovered, deaths}, error } = summaryContextSatet;

  if (error) {
    return <p>{ error }</p>
  }

  const handleMapMouseOver = (mapValues: HoverMapValue | undefined): void => {
    const tootltip = !mapValues ? '' : `Country: ${mapValues.name} <br /> Population: ${mapValues.population.toLocaleString()}`;
    setTooltipState(tootltip);
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
     
      <div>
        <MapChart setTooltipContent={handleMapMouseOver}/>
        <ReactTooltip multiline={true} html={true}>{tooltipState}</ReactTooltip>
      </div>
    </>
  );
} 

export default Home;