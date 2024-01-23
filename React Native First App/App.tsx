const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Generated from "./screens/Generated";
import PromptGeneration from "./screens/PromptGeneration";
import Profile from "./screens/Profile";
import EditDetails from "./screens/EditDetails";
import StartingScreen from "./screens/StartingScreen";
import MainMenu from "./screens/MainMenu";
import StartingScreen1 from "./components/StartingScreen";
import TagAndChange from "./components/TagAndChange";
import BottomNavBar from "./components/BottomNavBar";
import BottomNavBar1 from "./components/BottomNavBar1";
import BottomNavBar2 from "./components/BottomNavBar2";
import BottomNavBar3 from "./components/BottomNavBar3";
import BottomNavBar4 from "./components/BottomNavBar4";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import PastPrompts from "./screens/PastPrompts";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "SourceSans3-Light": require("./assets/fonts/SourceSans3-Light.ttf"),
    "SourceSans3-Regular": require("./assets/fonts/SourceSans3-Regular.ttf"),
    "SourceSans3-SemiBold": require("./assets/fonts/SourceSans3-SemiBold.ttf"),
    "SourceSans3-Bold": require("./assets/fonts/SourceSans3-Bold.ttf"),
    "SourceSans3-LightItalic": require("./assets/fonts/SourceSans3-LightItalic.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            initialRouteName="StartingScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Generated"
              component={Generated}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PromptGeneration"
              component={PromptGeneration}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PastPrompts"
              component={PastPrompts}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditDetails"
              component={EditDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StartingScreen"
              component={StartingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainMenu"
              component={MainMenu}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomNavBar"
              component={BottomNavBar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomNavBar1"
              component={BottomNavBar1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomNavBar2"
              component={BottomNavBar2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomNavBar3"
              component={BottomNavBar3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomNavBar4"
              component={BottomNavBar4}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
