/* eslint-disable react/no-unused-prop-types */
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Video from "react-native-video";
import PropTypes from "prop-types";
import { StoryType } from ".";
import FastImage from 'react-native-fast-image'
const ScreenWidth = Dimensions.get("window").width;

type Props = {
  story: StoryType;
  onVideoLoaded: (Object: any) => void;
  onImageLoaded?: () => void;
  pause: boolean;
  isLoaded?: boolean;
  isNewStory?: boolean;
};
const Story = (props: Props) => {
  const { story } = props;
  const { ds_arquivo } = story || {};
  const [isPortation, setIsPortation] = useState(false);
  const [heightScaled, setHeightScaled] = useState(231);

  let type = ds_arquivo
    ?.split(".")
    ?.pop()
    ?.toLowerCase();

  const list = ["jpg", "png", "jpeg"];

  return (
    <View style={styles.container}>
      {!list.includes(type) ? (
        <Video
          source={{ uri: ds_arquivo }}
          paused={props.pause || props.isNewStory}
          onBuffer={(w) => { }}
          onProgress={(asd) => { }}
          playInBackground
          onLoad={(item) => {
            const { width, height } = item.naturalSize;
            const heightScaled = height * (ScreenWidth / width);
            let isPortrait = height > width;
            setIsPortation(height > width);
            setHeightScaled(heightScaled);
            props.onVideoLoaded(item);
          }}
          style={
            isPortation
              ? [styles.contentVideoPortation, { height: heightScaled }]
              : [styles.contentVideo, { height: heightScaled }]
          }
          resizeMode={"stretch"}
        />
      ) : (
        <FastImage
          source={{ uri: ds_arquivo, priority: FastImage.priority.high }}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}

        />
      )}
    </View>
  );
};

Story.propTypes = {
  story: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  content: { width: "100%", height: "100%", },
  contentVideo: {
    width: ScreenWidth + 20,
    backgroundColor: "#000",
    height: 231,
  },
  contentVideoPortation: {
    width: ScreenWidth + 20,
    backgroundColor: "#000",
    height: 231,
  },
  imageContent: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  loading: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Story;
