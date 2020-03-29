import React, { memo } from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps";
import './mapChart.css';

export interface HoverMapValue {
    iso3: string,
    name: string,
    population: number
}

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart: React.FC<any>= ({ setTooltipContent }) => {
    return (
        <div>
            <ComposableMap data-tip="" height={330} projectionConfig={{ scale: 140 }}>
                <Sphere stroke="#E4E5E6" strokeWidth={0.5} id="rsm-sphere" fill="transparent"/>
                <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const { NAME, POP_EST, ISO_A3 } = geo.properties;
                                        const hoverMapValue: HoverMapValue = {
                                            population: POP_EST,
                                            name: NAME,
                                            iso3: ISO_A3
                                        }
                                        setTooltipContent(hoverMapValue);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent();
                                    }}
                                    style={{
                                    default: {
                                        fill: "#D6D6DA",
                                        outline: "none"
                                    },
                                    hover: {
                                        fill: "#F53",
                                        outline: "none"
                                    },
                                    pressed: {
                                        fill: "#E42",
                                        outline: "none"
                                    }
                                    }}
                                />
                            )
                        )}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
}

export default memo(MapChart);