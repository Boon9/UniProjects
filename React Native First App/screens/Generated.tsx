import * as React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase, useRoute, RouteProp   } from "@react-navigation/native";
import { Color, FontSize, Border, FontFamily } from "../GlobalStyles";
import * as Clipboard from 'expo-clipboard';
import { Modal, ScrollView } from "react-native";



// Define the expected parameters for the Generated screen
type GeneratedScreenRouteParams = {
  generatedPrompt: string;
};


const Generated = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<{ params: GeneratedScreenRouteParams }, 'params'>>();
  const { generatedPrompt } = route.params || {};
  const [modalVisible, setModalVisible] = React.useState(false);

  console.log("Received prompt:", generatedPrompt);


  const copyToClipboard = () => {
    Clipboard.setString(generatedPrompt);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.generated}>
      {/* Back arrow */}
      <TouchableOpacity
        style={styles.backArrowContainer}
        activeOpacity={0.2}
          onPress={() => {
            console.log('Back arrow pressed');
            navigation.goBack();
        }}
        >
        <Image
          style={styles.icon}
          source={require("../assets/back-arrow.png")}
        />
      </TouchableOpacity>

      {/* Work Smart Not Hard text */}
      <Text style={[styles.workSmartNot, styles.betterTypo]}>
        Work Smart Not Hard
      </Text>


      {/* Modal for displaying the prompt */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.modalText}>{generatedPrompt}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} activeOpacity={0.2} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomContainer}>
        {/* Modal Trigger */}
        <TouchableOpacity style={styles.modalTrigger} onPress={toggleModal}>
          <Text style={styles.modalTriggerText}>View Full Prompt</Text>
        </TouchableOpacity>

        {/* Copy button */}
        <TouchableOpacity
          style={styles.copyButton}
          activeOpacity={0.2}
          onPress={copyToClipboard}
        >
          <Text style={[styles.copyText]}>Copy</Text>
        </TouchableOpacity>
      </View>


      <ImageBackground
        style={styles.promptifierIcon}
        resizeMode="cover"
        source={require("../assets/promptifier.png")}
      />

      <Text style={[styles.betterPromptBetter, styles.quotePosition]}>
        Better Prompt, Better Results
      </Text>

      {/* Bottom navigation bar */}
      <View style={[styles.bottomBar, styles.bottomChildPosition]}>
        {/* ... Bottom navigation bar content ... */}
      </View>

    </View>

  );
};
const styles = StyleSheet.create({
  backArrowContainer: {
    position: 'absolute',
    top: 69,
    left: 10,
    padding: 10,
    zIndex: 10,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  bottomContainer: {
    // Removed the absolute positioning and used flex-end to align to the bottom
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50, // Adjust this value as needed
    alignItems: 'center',
  },
  modalTrigger: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    marginTop: 20,
    width: '60%',
  },
  modalTriggerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: FontSize.size_lg,
  },
  modalContainer: {
    // Add styles for the modal's outer container
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    // Add styles for the modal's content area
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalScrollView: {
    // Style for the ScrollView to ensure it's scrollable
    marginBottom: 10,
  },
  modalText: {
    fontSize: FontSize.size_lg,
    color: '#000',
    textAlign : 'center',
  },
  closeButton: {
    // Style for the close button within the modal
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
    alignSelf: 'flex-end',
    borderRadius: 15,
  },
  closeButtonText: {
    // Style for the close button text
    color: '#fff',
    textAlign: 'center',
    fontSize: FontSize.size_lg,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  openModalButton: {
    // Style for the button to open the modal
    // Add your styles here
  },
  openModalButtonText: {
    // Style for the text inside the button
    // Add your styles here
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  betterTypo: {
    textAlign: "center",
    color: Color.colorWhite,
    fontSize: FontSize.size_5xl,
  },
  copyText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: FontSize.size_lg,
  },
  copyButton: {
    // Adjust this style as needed
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    marginTop: 10, // Add some space between buttons
    width: '60%', // Set the width you want
  },
  childPosition: {
    borderRadius: Border.br_mini,
    bottom: "0%",
    right: "0%",
    top: "0%",
    left: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  betterPosition: {
    left: "5.81%",
    position: "absolute",
  },
  quotePosition: {
    left: "7.81%",
    position: "absolute",
  },
  workSmartNotTypo: {
    fontFamily: FontFamily.sourceSans3SemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  bottomChildPosition: {
    bottom: "0%",
    right: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  homePosition: {
    height: "96.88%",
    width: "14.42%",
    top: "3.13%",
    bottom: "0%",
    position: "absolute",
  },
  workSmartNot: {
    top: "47.99%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FontFamily.sourceSans3SemiBold,
    fontWeight: "600",
    position: "absolute",
    left: "0%",
    color: Color.colorWhite,
    fontSize: FontSize.size_5xl,
    width: "100%",
  },
  saveButtonChild: {
    backgroundColor: Color.colorBlack,
  },
  answerBoxChild: {
    backgroundColor: Color.colorDarkslategray_200,
  },
  enterYourText: {
    fontSize: FontSize.size_xl,
    minHeight: 100,
    padding: 10,
    marginHorizontal: 1,
    marginVertical: 5,
    color: '#fff',
  },
  answerBox: {
    width: "8.37%",
    paddingHorizontal: 6,
    paddingVertical: 6,
    top: "62.09%",
    alignSelf: 'center',
    backgroundColor: Color.colorDarkslategray_200,
    borderRadius: Border.br_mini,
  },

  promptifierIcon: {
    top: 86,
    left:49,
    width: 300,
    height: 300,
    position: "absolute",
  },
  betterPromptBetter: {
    top: "56.55%",
    left: "56.55%",
    fontFamily: FontFamily.sourceSans3Regular,
    textAlign: "center",
    color: Color.colorWhite,
    fontSize: FontSize.size_5xl,
  },
  bottomBarChild: {
    borderTopLeftRadius: Border.br_16xl,
    borderTopRightRadius: Border.br_16xl,
    backgroundColor: Color.colorDarkslategray_100,
    top: "0%",
    right: "0%",
    height: "100%",
  },
  profile: {
    left: "65.3%",
  },
  homeChild: {
    backgroundColor: Color.colorDarkslategray_300,
    top: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
  },
  vectorIcon: {
    height: "71.61%",
    width: "74.19%",
    top: "13.87%",
    bottom: "14.52%",
    left: "42.1%",
    position: "absolute",
  },
  home: {
    right: "72.09%",
    left: "13.49%",
  },
  newPageChild: {
    backgroundColor: Color.colorGainsboro,
    top: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
  },
  vectorIcon1: {
    height: "84.84%",
    width: "87.9%",
    top: "6.94%",
    right: "2.94%",
    bottom: "8.23%",
    position: "absolute",
  },
  newPage: {
    right: "44.19%",
    left: "41.4%",
  },
  bottomBar: {
    height: "6.87%",
    top: "93.13%",
  },
  generated: {
    backgroundColor: Color.colorGray,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default Generated;
