import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Recipe from "../../types/RecipeType";
import YouTubeIcon from "@mui/icons-material/YouTube";

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
      let desc: string = videoDetails.snippet.description;
      console.log("----description----" + desc);
      let ingredients = [];
      try {
        console.log(desc.split(new RegExp("INGREDIENTS", "i")));

        ingredients = desc
          .split(new RegExp("INGREDIENTS", "i"))[1]
          .split("\n\n")[0]
          .split("\n");
      } catch (error) {
        console.log(error);
      }

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
        authorId: 1,
        authorName: videoDetails.snippet.channelTitle,
        instructions: [],
        date: videoDetails.snippet.publishedAt,
        thumbnail: videoDetails.snippet.thumbnails.high.url,
        videoURL: videoDetails.id,
      };
      setRecipe(temp);
    }
  }, [videoDetails]);

  return (
    <FormControl fullWidth>
      {/* <div>Load data from Youtube</div> */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Example: https://www.youtube.com/watch?v=MyVidEoUrL"
          fullWidth
          label="Youtube video URL"
          variant="filled"
          helperText="Click on load button to fetch recipe details from youtube"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  size="small"
                >
                  <YouTubeIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button onClick={handleUrl} color="secondary">
          Load
        </Button>
      </Stack>

      {/* <label htmlFor="url"> Load Recipe details from Youtube</label>
      <br />
      <input type="text" />
      <Button onClick={handleUrl}>Load</Button> */}
    </FormControl>
  );
};

export default FetchRecipe;
