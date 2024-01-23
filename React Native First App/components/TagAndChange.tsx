import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { FontFamily, Color } from "../GlobalStyles";

const TagAndChange = () => {
  return (
    <Text style={styles.tagAndChange}>Tag and change home icon to usable</Text>
  );
};

const styles = StyleSheet.create({
  tagAndChange: {
    fontSize: 96,
    fontFamily: FontFamily.sourceSans3Regular,
    color: Color.colorWhite,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    width: 928,
    height: 507,
  },
});

export default TagAndChange;
