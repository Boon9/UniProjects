import React, { useState } from "react";
import { Modal, FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, ParamListBase, RouteProp } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import { PromptHistoryItem } from './PromptGeneration';
import * as Clipboard from 'expo-clipboard';


// Define the expected parameters for the PastPrompts screen
type PastPromptsScreenRouteParams = {
    pastPrompts: PromptHistoryItem[]; // This should match the data structure you're passing
  };

const PastPrompts = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<{ params: PastPromptsScreenRouteParams }, 'params'>>();
  const { pastPrompts } = route.params || { pastPrompts: [] };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptHistoryItem | undefined>(undefined);

  const renderItem = ({ item }: { item: PromptHistoryItem }) => (
    <TouchableOpacity
      style={styles.promptCard}
      onPress={() => {
        setSelectedPrompt(item);
        setModalVisible(true);
      }}
      onLongPress={() => {
        Clipboard.setString(`${item.input}\n${item.output}`);
        alert('Copied to clipboard!');
      }}
    >
      <Text style={styles.promptText}>{item.input}</Text>
      <Text style={styles.promptText}>{item.output}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Back arrow */}
      <TouchableOpacity
        style={styles.backArrowContainer}
        activeOpacity={0.2}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.icon}
          source={require("../assets/back-arrow.png")}
        />
      </TouchableOpacity>

      {/* List of past prompts */}
      <FlatList
        data={pastPrompts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.pastPromptsList}
      />

      {/* Modal for displaying prompt details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedPrompt && (
              <>
                <Text style={styles.modalText}>{selectedPrompt.input}</Text>
                <Text style={styles.modalText}>{selectedPrompt.output}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorGray,
    },
    pastPromptsList: {
        marginTop: 80, // Adjust the top margin to position the list below the back arrow
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#121212',
        alignSelf: 'flex-end',
        borderRadius: 15,
      },
      textStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: FontSize.size_lg,
      },
    viewMore: {
        color: '#ffffff', // Use your theme's accent color
        // ... other styling for the button
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
        shadowColor: "#ffffff",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
  backArrowContainer: {
    flex:1,
    top: 69,
    left: 10,
    padding: 0,
    zIndex: 10,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  pastPromptsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptCard: {
    backgroundColor: '#000000',
    width: '100%',
    padding: 20,
    marginBottom: 20,
    borderRadius: Border.br_mini,
    borderWidth: 1,
    borderColor: Color.colorDarkslategray_100,
  },
  promptText: {
    fontSize: FontSize.size_lg,
    color: '#ffff',
  },
  pastPrompts: {
    backgroundColor: Color.colorGray,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default PastPrompts;
