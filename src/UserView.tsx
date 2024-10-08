/* eslint-disable */
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  onClosePress: () => void;
  name?: string;
  datePublication?: string;
};

const diffDateWithNow = (date) => {
  let startDate = new Date(date);
  // Do your operations
  let endDate = new Date();
  let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;
  let current: string;
  if (days >= 1) {
    current = days == 1 ? "dia" : "dias";
    return Math.trunc(days) + " " + current;
  } else if (hours > 1) {
    current = days == 1 ? "hora" : "horas";
    return Math.trunc(hours) + " " + current;
  } else {
    current = minutes == 1 ? "minuto" : "minutos";
    return Math.trunc(hours) + " " + current;
  }
};

export default memo(function UserView(props: Props) {
  return (
    <View style={styles.userView}>
      <View style={{ flex: 1 }}>
        <View style={styles.barUsername}>
          <Text numberOfLines={1} style={styles.name}>
            {props.name}
          </Text>
        </View>

        <Text style={styles.time}>
          {!!props.datePublication &&
            `Publicado há ${diffDateWithNow(props.datePublication)}`}
        </Text>
      </View>
      <TouchableOpacity onPress={props.onClosePress}>
        <Icon name="close" color="white" size={40} style={{ marginRight: 8 }} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  barUsername: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
  verifyIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  userView: {
    flexDirection: "row",
    position: "absolute",
    top: 10,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#00000040",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    color: "white",
  },
  time: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 3,
    marginLeft: 12,
    color: "white",
  },
});
