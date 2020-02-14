import React from "react";

function FeedSelector(props) {
  return (
    <div className="selectorContainer">
      <div className="topFeedContainer" onClick={props.onTopClick}>
        🔥Top
      </div>
      <div className="newFeedContainer" onClick={props.onNewClick}>
        ⭐New
      </div>
      <style jsx>{`
        .selectorContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          color: #f4f4f4;
          border-bottom: 1px solid #8c8c8c;
          cursor: pointer;
          font-size: 18px;
          font-weight: 900;
        }
        .topFeedContainer {
          border-right: 1px solid #8c8c8c;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background-color: ${props.topBackgroundColor};
        }
        .topFeedContainer:hover {
          background-color: #1a1818;
          transition: 0.2s;
        }
        .newFeedContainer {
          height: 50px;
          width: 100%;
          display: flex;
          align-items: center;
          align-items: center;
          justify-content: center;
          background-color: ${props.newBackgroundColor};
        }
        .newFeedContainer:hover {
          background-color: #1a1818;
          transition: 0.2s;
        }
      `}</style>
    </div>
  );
}

export default FeedSelector;
