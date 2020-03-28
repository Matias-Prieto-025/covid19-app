import React, { memo } from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import './mapChart.css';

export interface HoverMapValue {
    iso3: string,
    name: string,
    population: number
}

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart: React.FC<any>= ({ setTooltipContent }) => {
    return (
        <>
            <ComposableMap data-tip="" height={300} projectionConfig={{ scale: 120 }}>
                <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const { NAME, POP_EST, ISO_3 } = geo.properties;
                                        const hoverMapValue: HoverMapValue = {
                                            population: POP_EST,
                                            name: NAME,
                                            iso3: ISO_3
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
        </>
    );
}

export default memo(MapChart);