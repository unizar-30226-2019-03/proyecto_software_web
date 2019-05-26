import LoadingSpin from "react-loading-spin";
import React from "react";

export const LoadingSpinUniCast = props => (
  <div className={props.className}>
    <LoadingSpin
      duration="2s"
      width="2px"
      timingFunction="ease-in-out"
      size="18px"
      primaryColor="#235da9"
      secondaryColor="lightgrey"
    />
  </div>
);
