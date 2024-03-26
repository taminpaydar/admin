import { Box } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapsCenter({latlng}) {
    return (
        <Box width={'100%'} height={'100'}>
            <MapContainer center={[latlng.lat, latlng.lng]} zoom={13} style={{ height: '200px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* <Marker position={[latlng.lat, latlng.lng]}>
                  
                </Marker> */}
            </MapContainer>
        </Box>
    )
}

export default MapsCenter