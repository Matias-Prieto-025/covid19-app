import React, { useContext, useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import ReactTooltip from "react-tooltip";
import { Summary } from '../../types';
import Card from '../../components/Card/Card'; 
import Map, { HoverMapValue } from '../../components/Map/Map';
import { CountriesContextState, SummaryContexState } from '../../App';
import './home.css';


const initialDisplaySummary: Summary = {
  confirmed: 0,
  recovered: 0,
  deaths: 0
}
const calculateRate = (confirmed: number, value: number): string => { 
  return (confirmed > 0 && (value*100/confirmed).toFixed(2)) || '0'
}

const Home: React.FC = () => {

  const [ tooltipState, setTooltipState] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<string>('The world');
  const [ displaySummary, setDisplaySummary] = useState<Summary>(initialDisplaySummary);

  const summaryContextSatet = useContext(SummaryContexState);
  const countriesContextState = useContext(CountriesContextState);

  useEffect(() => {
    setDisplaySummary(summaryContextSatet.summary);
  }, [summaryContextSatet.summary])

  if (!summaryContextSatet.summary) {
    return null;
  }

  const handleMapMouseOver = (mapValues: HoverMapValue | undefined): void => {

    let tooltipContent: string = '';
    if (!mapValues) {
      tooltipContent = '';
      setDisplaySummary(summaryContextSatet.summary);
      setSelectedCountry('The world')

    } else {
      tooltipContent = `Country: ${mapValues.name} <br /> Population: ${mapValues.population.toLocaleString()}`;

      const { countriesSummaries } = countriesContextState;
      const selectedCountrySummary = countriesSummaries.find( countrySummary => countrySummary.iso3 === mapValues.iso3) || initialDisplaySummary;

      const newSummary: Summary = {
        confirmed: selectedCountrySummary.confirmed,
        recovered: selectedCountrySummary.recovered,
        deaths: selectedCountrySummary.deaths
      }
      setDisplaySummary(newSummary);
      setSelectedCountry(mapValues.name);
    }
     
    setTooltipState(tooltipContent);
  }

  const { confirmed, recovered, deaths } = displaySummary;

  return (
    <>
      <h3 className="title">{selectedCountry}</h3>
      <Row justify="center">
        <Col span={6} xs={24}>
          <Card value={confirmed} title={'Confirmed'} className="background-yellow"/>
        </Col>
        <Col span={6} xs={24}>
          <Card value={recovered} title={'Recovered'} rate={calculateRate(confirmed, recovered)} className="background-green"/>
        </Col> 
        <Col span={6} xs={24}> 
          <Card  value={deaths} title={'Deaths'} rate={calculateRate(confirmed, deaths)} className="background-red"/>
        </Col>
      </Row>
      <div id="map-container">
        <Map setTooltipContent={handleMapMouseOver} />
        <ReactTooltip multiline={true} html={true}>{tooltipState}</ReactTooltip>
      </div>
    </>
  );
} 

export default Home;