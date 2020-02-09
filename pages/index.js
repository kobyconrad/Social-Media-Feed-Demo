import RoomService from "@roomservice/browser";
import { useSharedState } from "@roomservice/react";
import React from "react";

const client = new RoomService({
  authUrl: "http://localhost:3000/api/roomservice"
});

export default () => {
  const [sharedState, setSharedState] = useSharedState(client, "my-room");

  function onClick() {
    setSharedState(prevDoc => {
      prevDoc.number = Math.floor(Math.random() * 100);
    });
  }

  function onFormChange() {
    setSharedState(prevDoc => {
      prevDoc.formSubmit = sharedState.formState;
    });
  }

  function handleChange(event) {
    setSharedState(prevDoc => {
      prevDoc.formState = event.target.value;
    });
  }

  return (
    <div>
      <h1>Open multiple browser windows!</h1>

      <p>{sharedState.number || 0}</p>
      <p>{sharedState.formSubmit || ""}</p>

      <button onClick={onClick}>Pick Random Number</button>
      <form>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" onClick={onFormChange} />
      </form>
    </div>
  );
};

// How do I create a social media feed...
// Text Input
// Save to a component library
// sort by position
// let users increase or decrease position
// step #1: save text input to my state
