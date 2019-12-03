import React from "react";

const Loading = props => {
  const handleRefresh = () => {
    window.location.reload();
  };

  if (props.error) {
    return (
      <div>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    );
  }

  return <div className="animated fadeIn pt-4 text-center">Loading...</div>;
};

export default Loading;
