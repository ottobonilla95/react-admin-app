import React from "react";
import GoogleMap from "google-map-react";

// app config
import AppConfig from '../../constants/AppConfig';

const defaultMapProps = {
  center: [51.5074, 0.1278],
  zoom: 9,
  greatPlaceCoords: { lat: 51.5074, lng: 0.1278 },
};

const GoogleMapComponent = ({ children, onGoogleMapClick }) => {
  return (
    <GoogleMap
      bootstrapURLKeys={{ key: AppConfig.googleApiKey }}
      yesIWantToUseGoogleMapApiInternals={true}
      center={defaultMapProps.center}
      zoom={defaultMapProps.zoom}
      style={{ position: "relative", width: "100%", height: "100%" }}
      onClick={onGoogleMapClick}
    >
      {children}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
