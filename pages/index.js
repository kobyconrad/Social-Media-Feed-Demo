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
          <h1>Tw1tt3r BLACK</h1>
        </div>
        <div className="inputContainer">
          <textarea type="text" name="name" onChange={handleChange}></textarea>
          <input
            className="submitButton"
            type="submit"
            value="Tweet"
            onClick={onFormChange}
          />
        </div>
        <div className="feedContainer">
          <p>{sharedState.formSubmit || ""}</p>
        </div>
      </div>

      <style jsx>{`
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
        .columnContainer {
          min-width: 450px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          flex-direction: column;
          border-left: 1px solid #8c8c8c;
          border-right: 1px solid #8c8c8c;
        }
        .appContainer {
          display: flex;
          align-items: center;
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
          margin-top: 30px;
          margin-left: 10px;
          margin-right: 10px;
        }
        .inputContainer {
          display: flex;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 5px solid #8c8c8c;
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
