import React from "react";
import { ArrowUp, ArrowDown } from "react-feather";

function Tweet(props) {
  return (
    <div className="cardContainer">
      <div className="cardLeftBar">
        <ArrowUp onClick={props.onClick} size={25} />
        <div className="upvoteCount">{props.upvoteCount}</div>
        <ArrowDown onClick={props.onClickDown} size={25} />
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
          padding-top: 10px;
          padding-bottom: 10px;
          margin-top 10px;
          border-bottom: 1px solid #8c8c8c;
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
