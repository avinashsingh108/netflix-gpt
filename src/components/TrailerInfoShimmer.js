import React from "react";
import "../style/shimmer.css"; 
const TrailerInfoShimmer = () => {
  return (
    <div className="max-w-sm min-h-24 md:min-h-40 flex flex-col gap-y-2 md:gap-y-4 rounded-md shimmer-container">
      <div className="shimmer-element h-8 md:h-12 rounded-md"></div>
      <div className="shimmer-element h-14 md:h-20 rounded-md"></div>
      <div className="flex gap-x-2 w-full h-8 md:h-12 mr-4">
        <div className="shimmer-element flex-1 rounded-md"></div>
        <div className="shimmer-element flex-1 rounded-md"></div>
      </div>
    </div>
  );
};

export default TrailerInfoShimmer;
