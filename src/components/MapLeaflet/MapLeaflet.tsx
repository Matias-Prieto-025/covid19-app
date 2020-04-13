import React from 'react';
import ReactDomServer from 'react-dom/server'
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import geojsonContries from './geojson.json'
import population from './population';
import './mapLeaflet.css';

// TODO: define types and replace all "any" type in code 

export interface HoverMapValue {
    name: string,
    iso3: string
}

interface MapLeafletProps {
    handleClick: (mapValues: HoverMapValue | undefined) => void
}

const geoJsonData: any = geojsonContries;
const geoJSONStyle = () => {
    return {
      color: '#fff',
      weight: 1,
      fillOpacity: 0.5,
      fillColor: '#9ea6ad',
    }
}

const position: [number, number] = [0, 0];
const zoom = 2;

const MapLeaflet: React.FC<MapLeafletProps> = ({ handleClick }) => {

    const onEachFeature = (feature: any, layer: any) =>{
        const popupContent = <div><pre>Country: {feature.properties.name} <br />Population: {population.get(feature.properties.id)?.toLocaleString()}</pre></div>
        const popupContentString = ReactDomServer.renderToString(popupContent);
        layer.bindPopup(popupContentString)
        layer.on('click', (e: any) => {
            const handleClickArgs: HoverMapValue = {
                iso3: feature.properties.id,
                name: feature.properties.name
            }
            handleClick(handleClickArgs);
            layer.setStyle({...geoJSONStyle, fillColor: 'red'})
        });
        layer.on('popupclose', () => {
            handleClick(undefined);
        });
    }
    
    return <div className="leaflet-map-container">
        <Map className="leaflet-map" center={position} zoom={zoom}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
                data={geoJsonData}
                style={geoJSONStyle}
                onEachFeature={onEachFeature}
                />
        </Map>
    </div>
}

export default MapLeaflet;