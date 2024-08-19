/* eslint-disable react/no-unused-prop-types */
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Video from "react-native-video";
import PropTypes from "prop-types";
import { StoryType } from ".";
import FastImage from "react-native-fast-image";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
const ScreenWidth = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

type Props = {
  story: StoryType;
  onVideoLoaded: (Object: any) => void;
  onImageLoaded: () => void;
  pause: boolean;
  isLoaded: boolean;
  isNewStory?: boolean;
  onPause: (pause: boolean) => void;
};
const Story = (props: Props) => {
  const { story } = props;
  const { ds_arquivo } = story || {};
  const [isPortation, setIsPortation] = useState(false);
  const [heightScaled, setHeightScaled] = useState(231);
  const [isLoading, setLoading] = useState(false);
  let type = ds_arquivo
    ?.split(".")
    ?.pop()
    ?.toLowerCase();

  const list = ["jpg", "png", "jpeg"];

  function onLoadStart() {
    setLoading(true);
  }

  function onLoadEnd() {
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {!list.includes(type ?? "") ? (
        <Video
          source={{ uri: ds_arquivo }}
          paused={props.pause || props.isNewStory}
          onBuffer={(w) => {}}
          onProgress={(asd) => {}}
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
        <Zoomable
          minScale={0.5}
          maxScale={5}
          doubleTapScale={3}
          minPanPointers={1}
          isSingleTapEnabled
          onInteractionStart={() => {
            props.onPause(true);
          }}
          onInteractionEnd={() => props.onPause(false)}
          onPanStart={() => props.onPause(true)}
          onPanEnd={() => props.onPause(false)}
          onPinchStart={() => props.onPause(true)}
          onPinchEnd={() => props.onPause(false)}
          onDoubleTap={() => {
            props.onPause(true);
          }}
          style={styles.content}
        >
          <FastImage
            source={{ uri: ds_arquivo, priority: FastImage.priority.high }}
            onLoadEnd={() => {
              props.onImageLoaded();
              onLoadEnd();
            }}
            style={styles.content}
            // onLoadStart={onLoadStart}
            resizeMode="stretch"
          />
        </Zoomable>
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
  content: { width: "100%", height: height },

  containerLoading: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
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
  loaderStyle: {
    zIndex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "white",
  },
});

export default Story;
