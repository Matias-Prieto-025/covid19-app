import React, { useContext, useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Summary } from '../../types';
import Card from '../../components/Card/Card'; 
import MapLeaflet, { HoverMapValue } from '../../components/MapLeaflet/MapLeaflet';
import { CountriesContextState, SummaryContexState } from '../../App';
import './home.css';

const initialDisplaySummary: Summary = {
  confirmed: 0,
  recovered: 0,
  deaths: 0
}
const initialCountryName: string = 'The world';

const calculateRate = (confirmed: number, value: number): string => { 
  return (confirmed > 0 && (value*100/confirmed).toFixed(2)) || '0'
}

const Home: React.FC = () => {

  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountryName);
  const [displaySummary, setDisplaySummary] = useState<Summary>(initialDisplaySummary);

  const summaryContextState = useContext(SummaryContexState);
  const countriesContextState = useContext(CountriesContextState);

  useEffect(() => {
    setDisplaySummary(summaryContextState.summary);
  }, [summaryContextState.summary])

  if (!summaryContextState.summary) {
    return null;
  }

  const handleMapClick = (mapValues: HoverMapValue | undefined = undefined): void => {

    if (!mapValues) {
      setDisplaySummary(summaryContextState.summary);
      setSelectedCountry(initialCountryName);
    } else {
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
  }

  const { confirmed, recovered, deaths } = displaySummary;

  const shouldRenderMap = () => {
    const {countries, countriesSummaries} = countriesContextState;
    return countries.length && countriesSummaries.length;
  }

  return (
    <>
      <Row className="row-title" gutter={[16, 16]}> 
        <Col span={24}>
          <h3 className="title">{selectedCountry}</h3>
        </Col>
      </Row>
      <Row justify="center" gutter={{xs: 8, md: 16}}>
        <Col md={8} xs={24}>
          <Card value={confirmed} title={'Confirmed'} className="background-yellow"/>
        </Col>
        <Col md={8} xs={24}>
          <Card value={recovered} title={'Recovered'} rate={calculateRate(confirmed, recovered)} className="background-green"/>
        </Col> 
        <Col md={8} xs={24}> 
          <Card  value={deaths} title={'Deaths'} rate={calculateRate(confirmed, deaths)} className="background-red"/>
        </Col>
      </Row>
      {
        shouldRenderMap() && 
        <Row className="map-container">
          <Col span={24}>
            <MapLeaflet handleClick={handleMapClick}/>
          </Col>
        </Row>
      }
    </>
  );
} 

export default Home;