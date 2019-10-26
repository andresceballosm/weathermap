import React from 'react';
import MapView from 'react-native-maps'


export const MapsComponent = (props) => {
    const latitude = props.latitude;
    const longitude = props.longitude;
    const region = {
      latitude,
      longitude,
      latitudeDelta: 3,
      longitudeDelta: 3
    }
    return (
        <MapView
          style = {{ flex:1 }}
          region={region}
        >
          <MapView.Marker
            coordinate={region} />
        </MapView>  
    );
}
  