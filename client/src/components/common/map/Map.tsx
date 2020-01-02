import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import styled from "styled-components";

interface IMapWrapperProps {
  width: string;
  height: string;
}

interface IMapProps extends IMapWrapperProps {
  initialCenter: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  google: any;
}

const StyledMapWrapper = styled.div<IMapWrapperProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: relative;
`;

export const MapComponent = ({
  initialCenter,
  zoom = 14,
  google,
  width = "100%",
  height = "100%"
}: IMapProps) => (
  <StyledMapWrapper width={width} height={height}>
    <Map google={google} initialCenter={initialCenter} zoom={zoom}>
      <Marker />
    </Map>
  </StyledMapWrapper>
);

console.log(
  process.env.REACT_APP_GOOGLE_MAPS_API,
  "process.env.REACT_APP_GOOGLE_MAPS_API"
);

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API || ""
})(MapComponent);
