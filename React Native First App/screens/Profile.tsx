import * as React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileScreenRouteParams {
  name: string;
  phoneNumber: string;
  age: string;
  location: string;
}

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [userData, setUserData] = React.useState({
    name: '',
    phoneNumber: '',
    age: '',
    location: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetailsString = await AsyncStorage.getItem('userDetails');
        if (userDetailsString) {
          const userDetails = JSON.parse(userDetailsString);
          setUserData(userDetails);

          // Log to confirm data is fetched
          console.log('Data fetched:', userDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Add event listener for the focus event
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Profile screen focused');
      fetchData();
    });

    // Fetch data initially
    fetchData();

    // Cleanup the event listener
    return unsubscribe;
  }, [navigation]);


  return (
    <View style={styles.profile}>
      <Pressable style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/back-arrow.png")}
        />
      </Pressable>
      <Text style={[styles.profile1, styles.nameClr]}>Profile</Text>
      <Image
        style={[styles.profilePictureIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/profile-picture.png")}
      />
      <View style={[styles.nameBox, styles.namePosition]}>
        <View style={[styles.nameBoxChild, styles.childPosition]} />
        <Text style={[styles.xxxxxxxxxxxxxx, styles.editTypo]}>
          {userData.name || 'Name Placeholder'}
        </Text>
      </View>
      <View style={[styles.nameBox1, styles.namePosition]}>
        <View style={[styles.nameBoxChild, styles.childPosition]} />
        <Text style={[styles.xxxxxxxxxxxxxx, styles.editTypo]}>
          {userData.phoneNumber || 'PhoneNumber Placeholder'}
        </Text>
      </View>
      <View style={[styles.nameBox2, styles.namePosition]}>
        <View style={[styles.nameBoxChild, styles.childPosition]} />
        <Text style={[styles.xxxxxxxxxxxxxx, styles.editTypo]}>
          {userData.age || 'Age Placeholder'}
        </Text>
      </View>
      <View style={[styles.nameBox3, styles.namePosition]}>
        <View style={[styles.nameBoxChild, styles.childPosition]} />
        <Text style={[styles.xxxxxxxxxxxxxx, styles.editTypo]}>
          {userData.location || 'Location Placeholder'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("EditDetails")}
      >
        <View style={[styles.button, styles.buttonChildPosition]}>
          <View style={[styles.buttonChild, styles.buttonChildPosition]} />
          <Text style={[styles.edit, styles.editTypo]}>Edit</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.bottomBar}>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("StartingScreen")}
        >
          <Image
            style={styles.navIcon}
            source={require("../assets/vector.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("PromptGeneration")}
        >
          <Image
            style={styles.navIcon}
            source={require("../assets/vector2.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            style={styles.navIcon}
            source={require("../assets/profile.png")}
          />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  navIcon: {
    width: 36,
    height: 36,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Color.colorDarkslategray_200,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  nameClr: {
    color: Color.colorWhite,
    textAlign: "left",
  },
  namePosition: {
    left: "6.98%",
    right: "6.98%",
    width: "86.05%",
    height: "9.33%",
    position: "absolute",
  },
  childPosition: {
    backgroundColor: Color.colorDarkslategray_100,
    bottom: "0%",
    right: "0%",
    width: "100%",
  },
  editTypo: {
    fontSize: FontSize.size_5xl,
    color: Color.colorWhite,
    position: "absolute",
  },
  buttonChildPosition: {
    top: "0%",
    left: "0%",
    position: "absolute",
  },
  bottomBarPosition: {
    left: "0%",
    position: "absolute",
  },
  homePosition: {
    height: "96.88%",
    width: "14.42%",
    top: "3.13%",
    bottom: "0%",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
    maxWidth: "100%",
  },
  backArrow: {
    left: "7.67%",
    top: "6.76%",
    right: "83.26%",
    bottom: "92.63%",
    width: "9.07%",
    height: "3.62%",
    position: "absolute",
  },
  profile1: {
    top: "8.91%",
    left: "33.05%",
    fontSize: FontSize.size_21xl,
    textAlign: "left",
    fontFamily: FontFamily.sourceSans3Bold,
    fontWeight: "700",
    position: "absolute",
  },
  profilePictureIcon: {
    height: "12.45%",
    width: "26.98%",
    top: "17.92%",
    right: "36.05%",
    bottom: "69.64%",
    left: "36.98%",
    position: "absolute",
  },
  nameBoxChild: {
    height: "63.22%",
    top: "36.78%",
    borderRadius: Border.br_mini,
    left: "0%",
    position: "absolute",
  },
  xxxxxxxxxxxxxx: {
    top: "49.43%",
    left: "3.78%",
    fontWeight: "300",
    fontFamily: FontFamily.sourceSans3Light,
    textAlign: "left",
  },
  name: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.sourceSans3Regular,
    textAlign: "left",
    color: Color.colorWhite,
  },
  nameBox: {
    top: "33.26%",
    bottom: "57.4%",
  },
  nameBox1: {
    top: "69.96%",
    bottom: "20.71%",
  },
  nameBox2: {
    top: "57.73%",
    bottom: "32.94%",
  },
  nameBox3: {
    top: "45.49%",
    bottom: "45.17%",
  },
  buttonChild: {
    backgroundColor: Color.colorBlack,
    borderRadius: Border.br_mini,
    bottom: "0%",
    right: "0%",
    width: "100%",
    height: "100%",
  },
  edit: {
    top: "2.33%",
    left: "41.2%",
    textAlign: "center",
    fontFamily: FontFamily.sourceSans3Bold,
    fontWeight: "700",
  },
  button: {
    bottom: "0%",
    right: "0%",
    width: "100%",
    height: "100%",
  },
  saveButton: {
    height: "4.83%",
    width: "58.14%",
    top: "82.19%",
    right: "20.93%",
    bottom: "12.98%",
    left: "20.93%",
    position: "absolute",
  },
  newPage: {
    right: "41.59%",
  },
  profile: {
    backgroundColor: Color.colorGray,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default Profile;
