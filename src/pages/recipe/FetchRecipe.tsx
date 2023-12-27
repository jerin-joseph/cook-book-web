import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Recipe from "../../types/RecipeType";

const FetchRecipe = ({ setRecipe }) => {
  const [url, setUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);
  function handleUrl() {
    console.log(url);
    // https://www.youtube.com/watch?v=GZQ4RgmLCRI
    let video_id = url.split("v=")[1];
    const ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    axios
      .get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" +
          video_id +
          "&key=AIzaSyBt5mdAmPobYnN5dBT92RFphSmLHd6eze4"
      )
      .then((res) => {
        console.log(res.data.items[0]);
        setVideoDetails(res.data.items[0]);
        // console.log(temp);
      })
      .catch((error) => {
        console.log("Could not fetch video details" + error);
      });
  }

  useEffect(() => {
    if (videoDetails) {
      let desc = videoDetails.snippet.description;
      let ingredients = desc
        .split("INGREDIENTS")[1]
        .split("\n\n")[0]
        .split("\n");
      ingredients = ingredients.map((item) => {
        item = item.split("-");
        return {
          ingName: item[0],
          ingQty: item[1],
        };
      });
      let description = desc.split("\n\n")[0].substring(0, 255);
      let temp: Recipe = {
        name: videoDetails.snippet.title,
        description: description,
        ingredients: ingredients,
        authorId: "",
        instructions: "",
        date: "",
      };
      setRecipe(temp);
    }
  }, [videoDetails]);

  return (
    <div>
      <div>fetchRecipe</div>
      <label htmlFor="url">Youtube URL</label>
      <input
        type="text"
        name="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={handleUrl}>Load</Button>
    </div>
  );
};

export default FetchRecipe;
