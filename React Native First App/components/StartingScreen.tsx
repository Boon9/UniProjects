import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const StartingScreen1 = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.startingScreen}>
      <ImageBackground
        style={[styles.image1Icon, styles.framePosition]}
        resizeMode="cover"
        source={require("../assets/image1.png")}
      />
      <Text style={[styles.promptifier, styles.getStartedTypo1]}>
        Promptifier
      </Text>
      <View style={[styles.frame, styles.framePosition]}>
        <Text style={[styles.generateBetter, styles.getStartedTypo]}>
          Generate Better
        </Text>
        <Text style={[styles.generateBetter, styles.getStartedTypo]}>
          Work Better
        </Text>
      </View>
      <View style={[styles.frame1, styles.framePosition]}>
        <Text style={[styles.inputYourTest, styles.promptifierFlexBox]}>
          Input your test and get creative and inspiring prompts
        </Text>
        <View style={styles.frame2}>
          <TouchableOpacity
            style={styles.getStartedWrapper}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("MainMenu")}
          >
            <Text style={[styles.getStarted, styles.getStartedTypo]}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  framePosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  getStartedTypo1: {
    display: "flex",
    fontFamily: FontFamily.sourceSans3Bold,
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedTypo: {
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.colorWhite,
  },
  promptifierFlexBox: {
    textAlign: "center",
    color: Color.colorWhite,
  },
  image1Icon: {
    marginTop: -411,
    marginLeft: -164,
    width: 327,
    height: 327,
  },
  promptifier: {
    marginTop: -42,
    marginLeft: -215,
    fontSize: FontSize.size_21xl,
    width: 435,
    height: 89,
    textShadowColor: "#909090",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: Color.colorWhite,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  generateBetter: {
    fontStyle: "italic",
    fontFamily: FontFamily.sourceSans3Italic,
    alignSelf: "stretch",
  },
  frame: {
    marginTop: 91,
    marginLeft: -79,
    width: 163,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  inputYourTest: {
    fontSize: FontSize.size_base,
    fontWeight: "300",
    fontFamily: FontFamily.sourceSans3Light,
    alignSelf: "stretch",
  },
  getStarted: {
    width: 185,
    height: 39,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.sourceSans3Bold,
    fontWeight: "700",
  },
  getStartedWrapper: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorBlack,
    height: 63,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  frame2: {
    alignItems: "flex-end",
    alignSelf: "stretch",
    justifyContent: "center",
    overflow: "hidden",
  },
  frame1: {
    marginTop: 334,
    marginLeft: -199,
    width: 404,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  startingScreen: {
    backgroundColor: Color.colorGray,
    width: 430,
    height: 932,
    overflow: "hidden",
  },
});

export default StartingScreen1;
