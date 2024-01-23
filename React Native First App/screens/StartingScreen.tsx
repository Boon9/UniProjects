import * as React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const StartingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.startingScreen}>
      <Text style={[styles.promptifier, styles.promptifierFlexBox]}>
        Promptifier
      </Text>
      <Text style={[styles.workBetter, styles.betterTypo]}>Work Better</Text>
      <Text style={[styles.generateBetter, styles.betterTypo]}>
        Generate Better
      </Text>
      <Image
        style={styles.startingScreenChild}
        contentFit="cover"
        source={require("../assets/rectangle-32.png")}
      />
      <Text style={[styles.inputYourTest, styles.promptifierFlexBox]}>
        Input your test and get creative and inspiring prompts
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("MainMenu")}
      >
        <View style={styles.startButtonChild} />
        <Text style={styles.getStarted}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  promptifierFlexBox: {
    textAlign: "center",
    color: Color.colorWhite,
    position: "absolute",
  },
  betterTypo: {
    fontFamily: FontFamily.sourceSans3Italic,
    fontStyle: "italic",
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.colorWhite,
    position: "absolute",
  },
  promptifier: {
    top: "50%",
    left: "21%",
    fontSize: FontSize.size_21xl,
    textShadowColor: "#909090",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    fontFamily: FontFamily.sourceSans3Bold,
    fontWeight: "700",
    textAlign: "center",
    color: Color.colorWhite,
  },
  workBetter: {
    top: "66.2%",
    left: "33.2%",
  },
  generateBetter: {
    top: "62.55%",
    left: "28%",
  },
  startingScreenChild: {
    height: "38.52%",
    width: "88.84%",
    top: "5.04%",
    right: "5.58%",
    bottom: "56.44%",
    left: "5.58%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  inputYourTest: {
    width: "93.95%",
    top: "86.05%",
    left: "3.02%",
    fontWeight: "300",
    fontFamily: FontFamily.sourceSans3Light,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonChild: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorBlack,
    position: "absolute",
    width: "100%",
  },
  getStarted: {
    top: "13.81%",
    left: "31%",
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.sourceSans3Bold,
    fontWeight: "700",
    position: "absolute",
  },
  startButton: {
    height: "6.76%",
    width: "93.02%",
    top: "89.7%",
    right: "3.49%",
    bottom: "3.54%",
    left: "3.49%",
    position: "absolute",
  },
  startingScreen: {
    backgroundColor: Color.colorGray,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default StartingScreen;
