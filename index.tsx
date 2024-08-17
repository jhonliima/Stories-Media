import React, { useRef, useState, useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { StoryType } from "./src";

import StoryContainer from "./src/StoryContainer";

type Props = {
  data: StoryType[];
  containerAvatarStyle?: StyleSheet.Styles;
  avatarStyle?: StyleSheet.Styles;
  titleStyle?: StyleSheet.Styles;
  textReadMore?: string;
  isModelOpen: boolean;
  setModel: (bool: boolean) => any;
};

const Stories = (props: Props) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const modalScroll = useRef(null);

  useEffect(() => {
    if (props.isModelOpen) {
      setCurrentUserIndex(0);
    }
  }, [props.isModelOpen]);

  const onStoryClose = () => {
    props.setModel(false);
  };

  const onStoryNext = (isScroll: boolean) => {
    const newIndex = currentUserIndex + 1;
    if (props.data.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        try {
          modalScroll.current.scrollTo(newIndex, true);
        } catch (e) {}
      }
    } else {
      props.setModel(false);
    }
  };

  const onStoryPrevious = (isScroll: boolean) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        {props.data.map((item, index) => (
          <StoryContainer
            key={item.title}
            onClose={onStoryClose}
            onStoryNext={onStoryNext}
            onStoryPrevious={onStoryPrevious}
            dataStories={item}
            isNewStory={index !== currentUserIndex}
            textReadMore={props.textReadMore}
          />
        ))}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  boxStory: {
    marginLeft: 15,
  },
  ItemSeparator: { height: 1, backgroundColor: "#ccc" },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,255)",
    paddingBottom: 5,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  superCircle: {
    borderWidth: 3,
    borderColor: "blue",
    borderRadius: 60,
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 8,
    textAlign: "center",
  },
});

export default Stories;
