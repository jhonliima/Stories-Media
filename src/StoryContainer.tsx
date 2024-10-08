import React, { useState } from "react";
import {
  Dimensions,
  NativeTouchEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import GestureRecognizer from "react-native-swipe-gestures";
import Story from "./Story";
import ProgressArray from "./ProgressArray";
import { StoriesType, StoryType } from ".";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  dataStories: [StoriesType];
  onStoryNext: (boolean: Boolean) => void;
  onStoryPrevious: (boolean: Boolean) => void;
  onClose: () => void;
  isNewStory: boolean;
};

const StoryContainer: React.FC<Props> = (props: Props) => {
  const { dataStories } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModelOpen, setModel] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(3);
  const story = dataStories[currentIndex] as StoryType;

  const changeStory = (evt: NativeTouchEvent) => {
    if (evt.locationX > SCREEN_WIDTH / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };

  const nextStory = () => {
    if (dataStories.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryNext(false);
    }
  };

  const prevStory = () => {
    if (currentIndex > 0 && dataStories.length) {
      setCurrentIndex(currentIndex - 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryPrevious(false);
    }
  };

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onVideoLoaded = (length: any) => {
    setDuration(length.duration);

    setLoaded(true);
  };

  const onPause = (result: any) => {
    setIsPause(result);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onSwipeDown = () => {
    if (!isModelOpen) {
      props.onClose();
    } else {
      setModel(false);
    }
  };

  const onSwipeUp = () => {
    if (!isModelOpen) {
      setModel(true);
    }
  };

  return (
    <GestureRecognizer
      onSwipeDown={onSwipeDown}
      onSwipeUp={onSwipeUp}
      config={config}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={1}
        delayLongPress={500}
        onPress={(e) => changeStory(e.nativeEvent)}
        onLongPress={() => onPause(true)}
        onPressOut={() => onPause(false)}
        style={styles.container}
      >
        <Story
          onImageLoaded={onImageLoaded}
          pause={isPause}
          isNewStory={props.isNewStory}
          onVideoLoaded={onVideoLoaded}
          story={story}
          onPause={onPause}
          isLoaded={isLoaded}
        />
        <ProgressArray
          next={nextStory}
          isLoaded={isLoaded}
          duration={duration}
          pause={isPause}
          story={story}
          onClosePress={props.onClose}
          isNewStory={props.isNewStory}
          stories={dataStories}
          currentIndex={currentIndex}
          currentStory={dataStories[currentIndex]}
          length={dataStories.map((_, i) => i)}
          progress={{ id: currentIndex }}
        />
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  progressBarArray: {
    flexDirection: "row",
    position: "absolute",
    top: 30,
    width: "98%",
    height: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  userView: {
    flexDirection: "row",
    position: "absolute",
    top: 55,
    width: "98%",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 12,
    color: "white",
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 3,
    marginLeft: 12,
    color: "white",
  },
  content: { width: "100%", height: "100%" },
  loading: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "100%",
    height: "90%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bar: {
    width: 50,
    height: 8,
    backgroundColor: "gray",
    alignSelf: "center",
    borderRadius: 4,
    marginTop: 8,
  },
});

export default StoryContainer;
