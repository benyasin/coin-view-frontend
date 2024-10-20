import React from "react";

const Loading = () => {
  return (
    <div className={`flex justify-center items-center min-h-[300px]`}>
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};

export default Loading;
