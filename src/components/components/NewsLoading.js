import React, { useEffect, useState } from "react";


const NewsLoading = ({ key }) => {

  return (
    <div key={key} className="relative w-full h-full">

      <div className="rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse  space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="bg-gray-300 mb-2 h-40 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLoading;
