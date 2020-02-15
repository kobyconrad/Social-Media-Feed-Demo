import RoomService from "@roomservice/browser";
import { useSharedState } from "@roomservice/react";
import React, { useState } from "react";
import Tweet from "../components/card";
import LoadMore from "../components/loadMore";
import FeedSelector from "../components/feedSelector";

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
  const [feed, setFeed] = useState("new");
  const [feedSelectColorTop, setFeedSelectColorTop] = useState("");
  const [feedSelectColorNew, setFeedSelectColorNew] = useState("#1a1818");
  const [loadTweets, setLoadTweets] = useState(
    (sharedState.cardsArray2 || []).length - 10
  );

  function onFormChange() {
    if (state !== "") {
      // setSharedState(prevDoc => {
      //   prevDoc.total = prevDoc.total + 1 || 0;
      // });
      setSharedState(prevDoc => {
        if (!prevDoc.cardsArray2) {
          prevDoc.cardsArray2 = [];
        }
        prevDoc.cardsArray2.push({
          text: state,
          upvoteCount: 0,
          time: prevDoc.cardsArray2.length
        });
      });
      setState("");
    }
  }

  function onTopClick() {
    setFeed("top");
    setFeedSelectColorTop("#1a1818");
    setFeedSelectColorNew("");
  }

  function onNewClick() {
    setFeed("new");
    setFeedSelectColorTop("");
    setFeedSelectColorNew("#1a1818");
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

  const feedSortArr = (sharedState.cardsArray2 || []).sort(function(a, b) {
    if (feed === "top") {
      return a.upvoteCount - b.upvoteCount;
    } else if (feed === "new") {
      return a.time - b.time;
    }
  });

  // here it sets an index for a sliced array, but our function
  // calls the index on the TOTAL array
  //const mappedTweets = (sharedState.cardsArray2 || []).map(function(
  const mappedTweets = feedSortArr.map(function(item, index) {
    return (
      <Tweet
        tweetText={item.text}
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
          <img
            className="siteLogoMobile"
            src={"https://i.imgur.com/ZLEVCQ3.png"}
          />
          <h1 className="logo">tw1tt3r BLACK</h1>
          {/* <button onClick={deleteAllTweets}>Delete Tweets</button> */}
        </div>
        <div className="inputContainer">
          <textarea
            placeholder="Give a man a mask, and he will tweet the truth.."
            type="text"
            value={state}
            onChange={handleChange}
          ></textarea>
          <div
            className="submitButton"
            type="submit"
            value="Tweet"
            onClick={onFormChange}
          >
            <p className="tweetText">Tweet</p>
          </div>
        </div>
        <FeedSelector
          onTopClick={onTopClick}
          onNewClick={onNewClick}
          newBackgroundColor={feedSelectColorNew}
          topBackgroundColor={feedSelectColorTop}
        />
        <div className="feedContainer">{slicedTweets}</div>
        <LoadMore onClick={loadMoreTweets} />
      </div>
      <div className="rightBar">
        <div className="sfText">Made with ♡ in sf.</div>
        <div className="sponsoredText">
          Powered by{" "}
          <a className="rsLink" href="https://roomservice.dev" color="white">
            Room Service
          </a>
          .
        </div>
      </div>

      <style jsx>{`
        @media screen and (max-width: 500px) {
          .siteLogo {
            display: none;
          }
          .navBar {
            margin 0px !important;
          }
          .siteLogoMobile {
            margin-right: 15px;
            width: 45px;
            height: 45px;
          }
        }
        @media screen and (min-width: 501px) {
          .siteLogoMobile {
            display: none;
          }
        }
        @media screen and (min-width: 650px) {
          .rightBar{
            margin: 15px;
            color: white;
            font-size: 14px;
          }
          .sponsoredText {
            margin-top: 15px;
            font-size: 14px;
          }
          .rsLink:visited {
            color: #f4f4f4;
          }
          .rsLink {
            color: #f4f4f4;
          }
        }

        @media screen and (max-width: 651px) {
          .rightBar{
            display: none;
          }
        }
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
          height: 130px;
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
          user-select: none;
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
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 100px;
          margin-left: 10px;
          margin-right: 20px;
        }
        
        .submitButton:hover {
          background-color: #4390d4;
          cursor: pointer;
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
          display: flex;
          align-items: center;
          justify-content: center;
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
