import * as React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const EditDetails = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [age, setAge] = React.useState('');
  const [location, setLocation] = React.useState('');


  React.useEffect(() => {
    const loadData = async () => {
      try {
        const userDetailsString = await AsyncStorage.getItem('userDetails');
        if (userDetailsString) {
          const userDetails = JSON.parse(userDetailsString);
          setName(userDetails.name);
          setPhoneNumber(userDetails.phoneNumber);
          setAge(userDetails.age);
          setLocation(userDetails.location);
        }
      } catch (error) {
        console.error(error);
        // Optionally, display a toast notification for the error
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load data. Please try again later.'
        });
      }
    };

    loadData();
  }, []);



  const saveData = async () => {
  try {
    const userDetails = { name, phoneNumber, age, location };
    await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));

    // Log to confirm data is saved
    console.log('Data saved:', userDetails);

    // Navigate back after successful save
    navigation.goBack();
  } catch (error) {
    console.error(error);
    // Display a toast notification for the error
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Failed to save data. Please try again later.'
    });
  }
};



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.editDetails}>
        <Pressable style={styles.backArrow} onPress={() => navigation.navigate("Profile")}>
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/back-arrow.png")}
          />
        </Pressable>
        <Text style={[styles.profile, styles.profileFlexBox]}>Profile</Text>
        <Image
          style={[styles.profilePictureIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/profile-picture.png")}
        />
        <View style={[styles.nameBox, styles.namePosition]}>
          <View style={[styles.nameBoxChild, styles.childPosition]} />
          <TextInput
            value={name}
            onChangeText={setName}
            style={[styles.xxxxxxxxxxxxxx, styles.saveTypo, { color: '#FFFFFF' }]}
            placeholder="XXXXXXXXXXXXXX"
            placeholderTextColor="#fff"
            selectionColor="#FFFFFF"
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={[styles.enterYourName, styles.buttonChildPosition]}>
            Enter your name
          </Text>
        </View>
        <View style={[styles.nameBox1, styles.namePosition]}>
          <View style={[styles.nameBoxChild, styles.childPosition]} />
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={[styles.xxxxxxxxxxxxxx, styles.saveTypo, { color: '#FFFFFF' }]}
            placeholder="XXXXXXXXXXXXXX"
            placeholderTextColor="#fff"
            selectionColor="#FFFFFF"
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={[styles.enterYourName, styles.buttonChildPosition]}>
            Enter your phone number
          </Text>
        </View>
        <View style={[styles.nameBox2, styles.namePosition]}>
          <View style={[styles.nameBoxChild, styles.childPosition]} />
          <TextInput
            value={age}
            onChangeText={setAge}
            style={[styles.xxxxxxxxxxxxxx, styles.saveTypo, { color: '#FFFFFF' }]}
            placeholder="XXXXXXXXXXXXXX"
            placeholderTextColor="#fff"
            selectionColor="#FFFFFF"
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={[styles.enterYourName, styles.buttonChildPosition]}>
            Enter your age
          </Text>
        </View>
        <View style={[styles.nameBox3, styles.namePosition]}>
          <View style={[styles.nameBoxChild, styles.childPosition]} />
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={[styles.xxxxxxxxxxxxxx, styles.saveTypo, { color: '#FFFFFF' }]}
            placeholder="XXXXXXXXXXXXXX"
            placeholderTextColor="#fff"
            selectionColor="#FFFFFF"
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={[styles.enterYourName, styles.buttonChildPosition]}>
            Enter your location
          </Text>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.2}
          onPress={saveData}
          >
          <View style={[styles.button, styles.buttonChildPosition]}>
            <Text style={[styles.save, styles.saveTypo]}>Save</Text>
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
    </TouchableWithoutFeedback>
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
  profileFlexBox: {
    textAlign: "left",
    color: Color.colorWhite,
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
  saveTypo: {
    fontSize: FontSize.size_5xl,
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
  profile: {
    top: "8.91%",
    left: "33.05%",
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.sourceSans3Bold,
    fontWeight: "700",
    textAlign: "left",
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
  },
  enterYourName: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.sourceSans3Regular,
    textAlign: "left",
    color: '#FFFFFF',
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
  save: {
    left: "37.6%",
    textAlign: "center",
    color: Color.colorWhite,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.sourceSans3Bold,
    fontWeight: "700",
  },
  button: {
    backgroundColor: '#000',
    width: "100%",
    height: "100%",
    borderRadius: 15,
},
  saveButton: {
    height: "4.83%",
    width: "58.14%",
    top: "82.19%",
    bottom: "12.98%",
    left: "18.5%",
    position: "absolute",
  },
  bottomBarChild: {
    borderTopLeftRadius: Border.br_16xl,
    borderTopRightRadius: Border.br_16xl,
    backgroundColor: Color.colorDarkslategray_100,
    bottom: "0%",
    right: "0%",
    width: "100%",
    height: "100%",
  },
  profile1: {
    left: "69.3%",
    right: "16.28%",
  },
  homeChild: {
    backgroundColor: Color.colorDarkslategray_300,
    bottom: "0%",
    right: "0%",
    width: "100%",
    height: "100%",
  },
  vectorIcon: {
    height: "71.61%",
    width: "74.19%",
    top: "13.87%",
    right: "13.71%",
    bottom: "14.52%",
    left: "12.1%",
    position: "absolute",
  },
  home: {
    right: "72.09%",
    left: "13.49%",
  },
  newPageChild: {
    backgroundColor: Color.colorGainsboro,
    bottom: "0%",
    right: "0%",
    width: "100%",
    height: "100%",
  },
  vectorIcon1: {
    height: "84.84%",
    width: "87.9%",
    top: "6.94%",
    right: "6.94%",
    bottom: "8.23%",
    left: "5.16%",
    position: "absolute",
  },
  newPage: {
    right: "44.19%",
    left: "41.4%",
  },
  editDetails: {
    backgroundColor: Color.colorGray,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default EditDetails;
