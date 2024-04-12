import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Box } from '@mui/material'


const MapMarker = ({ coordinates, show}) => {
    if (show) {
        return (
            <Marker coordinates={coordinates}>
                <circle r={8} fill="#F53" />
            </Marker>
        )
    }

    return '';
}

const Map = ({ width, coordinates, showMarker }) => (
    <Box 
        component='main'
        width={`calc(100% - ${width}px)`}
        mr={width}
      >
        <ComposableMap width={1300} >
            <Geographies geography='/map.json'>
                {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography  key={geo.rsmKey} geography={geo} />
                ))
              }
            </Geographies>
            <MapMarker coordinates={coordinates} show={showMarker} />
        </ComposableMap>
    </Box>
);



export default Map;