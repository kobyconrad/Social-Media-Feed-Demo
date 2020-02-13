import React from "react";

function LoadMore(props) {
  return (
    <div className="loadContainer" onClick={props.onClick}>
      Load More
      <style jsx>{`
        .loadContainer {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #8c8c8c;
          background-color: #212625;
          color: #f4f4f4;
        }
      `}</style>
    </div>
  );
}

export default LoadMore;
