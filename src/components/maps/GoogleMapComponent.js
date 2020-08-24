import React from "react";
import GoogleMap from "google-map-react";

const defaultMapProps = {
  center: [51.5074, 0.1278],
  zoom: 9,
  greatPlaceCoords: { lat: 51.5074, lng: 0.1278 },
};

const GoogleMapComponent = ({ children, onGoogleMapClick }) => {
  return (
    <GoogleMap
      bootstrapURLKeys={{ key: "AIzaSyCbuJQILg6ZPk-ousi5mTDdtw-z4ihbMno" }}
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
