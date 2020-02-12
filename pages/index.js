import RoomService from "@roomservice/browser";
import { useSharedState } from "@roomservice/react";
import React, { useState } from "react";
import Tweet from "../components/card";

const client = new RoomService({
  authUrl: "http://localhost:3000/api/roomservice"
});

// 1. I need to set sharedState.cards === []
// 2. When I press "tweet" fn onFormChange pushes a new object into that array
// 3. I to map components, to the "text" field within the objects, of my array saved in RS state

export default () => {
  const [sharedState, setSharedState] = useSharedState(
    client,
    "tw1tt3r-BLACK",
    {
      cardsArray: []
    }
  );
  const [state, setState] = useState("");

  function onFormChange() {
    setSharedState(prevDoc => {
      if (!prevDoc.cardsArray2) {
        prevDoc.cardsArray2 = [];
      }
      prevDoc.cardsArray2.push({ text: state });
    });
  }

  function handleChange(event) {
    setState(event.target.value);
  }

  const mappedTweets = (sharedState.cardsArray2 || []).map(function(item) {
    return <Tweet tweetText={item.text} />;
  });

  return (
    <div className="appContainer">
      <div className="navBar">
        <img className="siteLogo" src={"https://i.imgur.com/XoPNt7U.png"} />
      </div>
      <div className="columnContainer">
        <div className="appTitle">
          <h1 className="logo">tw1tt3r BLACK</h1>
        </div>
        <div className="inputContainer">
          <textarea
            placeholder="Anonymously tweet secrets.."
            type="text"
            name="name"
            onChange={handleChange}
          ></textarea>
          <input
            className="submitButton"
            type="submit"
            value="Tweet"
            onClick={onFormChange}
          />
        </div>
        <div className="feedContainer">{mappedTweets}</div>
      </div>

      <style jsx>{`
        .navBar {
          color: #f4f4f4;
          display: flex;
          margin: 20px;
        }
        .siteLogo {
          width: 40px;
          height: 35px;
        }
        textarea {
          width: 100%;
          height: 100px;
          padding: 10px 20px 10px 20px;
          border: 0px;
          font-size: 18px;
          outline: none;
          resize: none;
          background-color: #0d0d0d;
          color: #f4f4f4;
        }
        .feedContainer {
          color: #f4f4f4;
          width: 100%;
          font-size: 18px;
          display: flex;
          align-items: center;
          flex-direction: column-reverse;
        }
        .columnContainer {
          width: 450px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          flex-direction: column;
          border-left: 1px solid #8c8c8c;
          border-right: 1px solid #8c8c8c;
        }
        .logo {
          font-weight: 900;
        }
        .appContainer {
          display: flex;

          justify-content: center;
        }
        .submitButton {
          width: 100px;
          height: 35px;
          background-color: #1ca1f2;
          border: none;
          border-radius: 17px;
          color: #f4f4f4;
          outline: none;
          font-size: 15px;
          font-weight: 900;
          margin-top: 50px;
          margin-left: 10px;
          margin-right: 20px;
        }
        .inputContainer {
          display: flex;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 4px solid #8c8c8c;
          width: 100%;
        }
        .appTitle {
          color: #f4f4f4;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: #0d0d0d;
          font-family: Arial;
        }
      `}</style>
    </div>
  );
};

// How do I create a social media feed...
// Text Input
// Save to a component library
// sort by position
// let users increase or decrease position
// step #1: save text input to my state
