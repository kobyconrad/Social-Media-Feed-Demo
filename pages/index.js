import RoomService from "@roomservice/browser";
import { useSharedState } from "@roomservice/react";
import React, { useState } from "react";
import Tweet from "../components/card";
import LoadMore from "../components/loadMore";

const client = new RoomService({
  authUrl: "https://tw1tt3rblack.com/api/roomservice"
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
  const [loadTweets, setLoadTweets] = useState(
    (sharedState.cardsArray2 || []).length - 10
  );

  function onFormChange() {
    setSharedState(prevDoc => {
      if (!prevDoc.cardsArray2) {
        prevDoc.cardsArray2 = [];
      }
      prevDoc.cardsArray2.push({ text: state, upvoteCount: 0 });
    });
  }

  function handleChange(event) {
    setState(event.target.value);
  }

  function handleUpvote(index) {
    setSharedState(prevDoc => {
      prevDoc.cardsArray2[index].upvoteCount =
        prevDoc.cardsArray2[index].upvoteCount + 1;
    });
  }

  function handleDownvote(index) {
    setSharedState(prevDoc => {
      prevDoc.cardsArray2[index].upvoteCount =
        prevDoc.cardsArray2[index].upvoteCount - 1;
    });
  }

  function deleteAllTweets() {
    setSharedState(prevDoc => {
      prevDoc.cardsArray2 = [];
    });
  }

  function loadMoreTweets() {
    setLoadTweets(loadTweets - 10);
  }

  // here it sets an index for a sliced array, but our function
  // calls the index on the TOTAL array
  const mappedTweets = (sharedState.cardsArray2 || []).map(function(
    item,
    index
  ) {
    return (
      <Tweet
        tweetText={item.text + `${index}`}
        upvoteCount={item.upvoteCount || 0}
        onClick={function() {
          handleUpvote(index);
        }}
        onClickDown={function() {
          handleDownvote(index);
        }}
      />
    );
  });

  const slicedTweets = mappedTweets.slice(
    loadTweets,
    (sharedState.cardsArray2 || []).length
  );

  return (
    <div className="appContainer">
      <div className="navBar">
        <img className="siteLogo" src={"https://i.imgur.com/ZLEVCQ3.png"} />
      </div>
      <div className="columnContainer">
        <div className="appTitle">
          <h1 className="logo">tw1tt3r BLACK</h1>
          {/* <button onClick={deleteAllTweets}>Delete Tweets</button> */}
        </div>
        <div className="inputContainer">
          <textarea
            placeholder="Give a man a mask, and he will tweet the truth.."
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
        <div className="feedContainer">{slicedTweets}</div>
        <LoadMore onClick={loadMoreTweets} />
      </div>

      <style jsx>{`
        .navBar {
          color: #f4f4f4;
          display: flex;
          margin: 20px;
        }
        .siteLogo {
          width: 50px;
          height: 50px;
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
