import React from "react";

function FeedSelector(props) {
  return (
    <div className="selectorContainer">
      <div className="topFeedContainer" onClick={props.onTopClick}>
        Top
      </div>
      <div className="newFeedContainer" onClick={props.onNewClick}>
        New
      </div>
      <style jsx>{`
        .selectorContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          color: #f4f4f4;
          border-bottom: 1px solid #8c8c8c;
        }
        .topFeedContainer {
          border-right: 1px solid #8c8c8c;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .newFeedContainer {
          height: 50px;
          width: 100%;
          display: flex;
          align-items: center;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default FeedSelector;
