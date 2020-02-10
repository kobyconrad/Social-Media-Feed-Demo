import RoomService from "@roomservice/browser";
import { useSharedState } from "@roomservice/react";
import React, { useState } from "react";

const client = new RoomService({
  authUrl: "http://localhost:3000/api/roomservice"
});

export default () => {
  const [sharedState, setSharedState] = useSharedState(client, "my-room");
  const [state, setState] = useState("");

  function onFormChange() {
    setSharedState(prevDoc => {
      prevDoc.formSubmit = state;
    });
  }

  function handleChange(event) {
    setState(event.target.value);
  }

  return (
    <div className="appContainer">
      <div className="columnContainer">
        <div className="appTitle">
          <h1>Social Media Feed Demo</h1>
        </div>
        <div className="inputContainer">
          <textarea type="text" name="name" onChange={handleChange}></textarea>
          <input
            className="submitButton"
            type="submit"
            value="Submit"
            onClick={onFormChange}
          />
        </div>
        <div className="feedContainer">
          <p>{sharedState.formSubmit || ""}</p>
        </div>
      </div>

      <style jsx>{`
        textarea {
          width: 300px;
          height: 50px;
          padding: 10px;
          border: 0px;
          font-family: Arial;
          font-size: 16px;
          outline: none;
          resize: none;
        }
        ,
        columnContainer {
          min-width: 400px;
          display: flex;
          flex-direction: column;
        }
        ,
        appContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 400px;
        }
        ,
        submitButton {
          width: 100px;
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
