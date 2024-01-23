import * as React from "react";
import {
  StyleProp,
  ViewStyle,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Border, Color } from "../GlobalStyles";

type BottomNavBar3Type = {
  style?: StyleProp<ViewStyle>;
};

const BottomNavBar3 = ({ style }: BottomNavBar3Type) => {
  return (
    <View style={[styles.bottomNavBar, style]}>
      <Image
        style={[styles.vectorIcon, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector9.png")}
      />
      <TouchableOpacity
        style={styles.rectangleParent}
        activeOpacity={0.2}
        onPress={() => {}}
      >
        <Pressable style={[styles.groupChild, styles.groupChildLayout]} />
        <Image
          style={[styles.vectorIcon1, styles.groupChildLayout]}
          contentFit="cover"
          source={require("../assets/vector10.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileIcon}
        activeOpacity={0.2}
        onPress={() => {}}
      >
        <Image
          style={[styles.vectorIcon2, styles.vectorIconLayout]}
          contentFit="cover"
          source={require("../assets/vector11.png")}
        />
        <Image
          style={[styles.vectorIcon3, styles.vectorIconLayout]}
          contentFit="cover"
          source={require("../assets/vector12.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIconLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  groupChildLayout: {
    borderRadius: Border.br_mini,
    position: "absolute",
  },
  vectorIcon: {
    height: "43.75%",
    width: "6.98%",
    top: "28.13%",
    right: "73.49%",
    bottom: "28.13%",
    left: "19.53%",
    position: "absolute",
  },
  groupChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.colorBlack,
  },
  vectorIcon1: {
    height: "50%",
    width: "54.17%",
    top: "23.96%",
    right: "23.96%",
    bottom: "26.04%",
    left: "21.88%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  rectangleParent: {
    height: "75%",
    width: "11.16%",
    top: "12.5%",
    right: "44.88%",
    bottom: "12.5%",
    left: "43.95%",
    position: "absolute",
  },
  vectorIcon2: {
    height: "105.88%",
    width: "105.88%",
    top: "-2.94%",
    right: "-2.94%",
    bottom: "-2.94%",
    left: "-2.94%",
    position: "absolute",
  },
  vectorIcon3: {
    height: "67.65%",
    width: "83.24%",
    top: "17.06%",
    right: "8.24%",
    bottom: "15.29%",
    left: "8.53%",
    position: "absolute",
  },
  profileIcon: {
    height: "53.13%",
    width: "7.91%",
    top: "23.44%",
    right: "19.53%",
    bottom: "23.44%",
    left: "72.56%",
    position: "absolute",
  },
  bottomNavBar: {
    alignSelf: "stretch",
    borderTopLeftRadius: Border.br_19xl,
    borderTopRightRadius: Border.br_19xl,
    backgroundColor: Color.colorDarkslategray_100,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 12,
    elevation: 12,
    shadowOpacity: 1,
    height: 64,
  },
});

export default BottomNavBar3;
