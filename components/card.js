import React, { useState } from "react";
import { ArrowUp, ArrowDown } from "react-feather";

function Tweet(props) {
  const [up, setUp] = useState("white");
  const [down, setDown] = useState("white");

  return (
    <div className="cardContainer">
      <div className="cardLeftBar">
        <ArrowUp
          className="voteArrows"
          color={up}
          onClick={props.onClick}
          size={25}
          onMouseOver={function() {
            setUp("#1ca1f2");
          }}
          onMouseOut={function() {
            setUp("white");
          }}
        />
        <div className="upvoteCount">{props.upvoteCount}</div>
        <ArrowDown
          onClick={props.onClickDown}
          size={25}
          color={down}
          onMouseOver={function() {
            setDown("#1ca1f2");
          }}
          onMouseOut={function() {
            setDown("white");
          }}
        />
      </div>
      <div className="cardTextContainer">
        <div className="cardAnonymousText">@anonymous</div>
        <div className="cardTextPropsContainer">{props.tweetText}</div>
      </div>

      <style jsx>{`
        .cardContainer {
          width: 100%;
          min-height: 80px;
          display: flex;
          justify-content: center;
          padding-top: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #8c8c8c;
          cursor: pointer;
          user-select: none;
        }
        .cardContainer:hover {
          background-color: #1a1818;
          transition: 0.2s;
        }
        .cardLeftBar {
          width: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .upvoteCount {
          margin-top: 3px;
          margin-bottom: 3px;
        }
        ArrowDown {
          fill: #1ca1f2;
        }
        .voteArrows {
          color: #1ca1f2;
        }
        .arrowContainer {
        }
        .cardTextContainer {
          width: 100%;
          margin-right: 10px;
        }
        .cardAnonymousText {
          font-weight: 900;
        }
        .cardTextPropsContainer {
          display: flex;
          flex-direction: column-reverse;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .cardLogo {
          width: 40px;
          height: 35px;
        }
      `}</style>
    </div>
  );
}

export default Tweet;
