import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import ProgressBar from "./ProgressBar";
import UserView from "./UserView";
import {  StoryType } from ".";
type Props = {
  next: () => void;
  pause: boolean;
  isLoaded: boolean;
  isNewStory: boolean;
  duration: number;
  stories: Array<Object>;
  currentStory: Object;
  currentIndex: number;
  length: Array<number>;
  progress: Object;
  story: StoryType;
  onClosePress: () => void;

};

const ProgressArray = (props: Props) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (props.pause) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [props.pause]);

  return (
   
 <Animated.View style={[styles.progressBarArray, { opacity }]}>
      {props.length.map((i: number, index) => (
        <ProgressBar
          index={index}
          key={i}
          duration={props.duration || 3}
          isNewStory={props.isNewStory}
          currentIndex={props.currentIndex}
          next={props.next}
          length={props.stories.length}
          active={i === props.currentIndex ? 1 : i < props.currentIndex ? 2 : 0}
          isLoaded={props.isLoaded}
          pause={props.pause}
        />
      ))}
       <UserView
            name={props.story?.ds_nome}
            datePublication={props?.story?.createdAt}
            onClosePress={props.onClosePress}
          />
    </Animated.View>
   
   
  );
};

const styles = StyleSheet.create({
  progressBarArray: {
    flexDirection: "row",
    position: "absolute",
    top: 60,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",

  },
});

export default ProgressArray;
