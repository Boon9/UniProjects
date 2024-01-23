import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, ParamListBase, RouteProp } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";
import nlp from 'compromise';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from "react-native-gesture-handler";



interface PromptGenerationParams {
  fact: string;
}

declare module 'compromise' {
  interface Sentence {
    text(): string;
    has(term: string): boolean;
    adjectives(): { text(): string }[];
    match(term: string): any; // Simplified for this example
  }

  interface Document {
    sentences(): Sentence[];
  }
  export default function nlp(text: string): Document;
}


export interface PromptHistoryItem {
  input: string;
  output: string;
}

const PromptGeneration = () => {


  const route = useRoute<RouteProp<{ params: PromptGenerationParams }, 'params'>>();
  const [improvedPrompt, setImprovedPrompt] = React.useState(''); // New state for the improved prompt
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const factFromMenu = route.params?.fact ?? '';
  const [userInput, setUserInput] = React.useState(factFromMenu);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);


  useEffect(() => {
    // Load history when the component mounts
    const loadHistory = async () => {
      try {
        const historyData = await AsyncStorage.getItem('promptHistory');
        if (historyData !== null) {
          setHistory(JSON.parse(historyData));
        }
      } catch (error) {
        console.error('Error loading history', error);
      }
    };

    loadHistory();
  }, []);

  const addToHistory = async (input: string, output: string) => {
    const newHistoryItem: PromptHistoryItem = { input, output };
    const updatedHistory = [...history, newHistoryItem];
    setHistory(updatedHistory);

    try {
      const historyData = JSON.stringify(updatedHistory);
      await AsyncStorage.setItem('promptHistory', historyData);
    } catch (error) {
      console.error('Error saving history', error);
    }
  };



  const generatePromptWithGPT = async (inputText: string) => {
    try {
      // Call your backend server endpoint
      const response = await axios.post('http://192.168.100.95:5000/generate-prompt', {
        text: `Limit it to 2 words and a single paragraph: Generate thought-provoking questions and statements about: ${inputText}`,
      });

      // Process the response received from your server
      if (response.data && response.data.improvedText) {
        return response.data.improvedText;
      } else {
        throw new Error('Failed to generate prompt');
      }
    } catch (error) {
      console.error('Error calling backend server:', error);
      Alert.alert('Error', 'Failed to process text. Please try again.');
      return null;
    }
  };




  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);




  interface Adjective {
    text: () => string;
  }

  const improveUserInput = (input: string) => {
    let doc = nlp(input);

    let improvedSentences: string[] = doc.sentences().map(sentence => {
      let text = sentence.text().charAt(0).toUpperCase() + sentence.text().slice(1);

      if (sentence.has('?')) {
        text += '?';
      } else {
        sentence.adjectives().forEach(adj => {
          const enhancedAdj = `very ${adj.text()}`;
          sentence.match(adj.text()).replaceWith(enhancedAdj);
        });

        if (sentence.match('who|what|where|when|why|how').found) {
          text += '. What is the significance of this?';
        } else {
          text += '. Tell me more about it.';
        }
      }

      return text;
    });

    return improvedSentences.join(' ').replace(/\.+/g, '.');
  };

  const handleInputChange = (text: string) => {
    setUserInput(text);
  };

  const generatePrompt = async () => {
    if (!userInput.trim()) {
      Alert.alert('Input Required', 'Please enter some text to generate a prompt.');
      return;
    }

    const improvedText = await generatePromptWithGPT(userInput);
    if (improvedText) {
      addToHistory(userInput, improvedText); // Add to history
      setImprovedPrompt(improvedText);
      console.log('Passing prompt:', improvedText);
      navigation.navigate('Generated', { generatedPrompt: improvedText });
    } else {
      Alert.alert('Error', 'Failed to process text. Please try again.');
    }
  };

  const viewHistory = () => {
    navigation.navigate('PastPrompts', { pastPrompts: history });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            {!isKeyboardVisible && (
              <>
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

                <ImageBackground
                  style={styles.promptifierIcon}
                  resizeMode="cover"
                  source={require("../assets/promptifier.png")}
                />

                <View style={styles.header}>
                  <Text style={styles.workSmartNot}>Work Smart Not Hard</Text>
                  <Text style={styles.betterPromptBetter}>Better Prompt, Better Results</Text>
                </View>
              </>
            )}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.enterYourText}
                placeholder={factFromMenu ? "Edit the fact or enter new text" : "Enter your text here"}
                placeholderTextColor="#fff"
                onChangeText={handleInputChange}
                value={userInput}
                multiline={true}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>

            {!isKeyboardVisible && (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={generatePrompt}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.historyButton} onPress={viewHistory}>
                  <Text style={styles.buttonText}>History</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.colorGray,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  backArrowContainer: {
    position: 'absolute',
    left: 10,
    padding: 10,
    zIndex: 10,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  workSmartNot: {
    fontSize: FontSize.size_5xl,
    color: Color.colorWhite,
    letterSpacing:2,
    fontWeight: '600',
  },
  betterPromptBetter: {
    fontSize: FontSize.size_lg,
    color: Color.colorWhite,
    textAlign: 'center',
    letterSpacing:2,
    marginBottom: 20,
  },
  promptifierIcon: {
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  enterYourText: {
    backgroundColor: Color.colorDarkslategray_200,
    borderRadius: 20,
    color: '#fff',
    fontSize: FontSize.size_xl,
    padding: 15,
    width: '100%',
    height: 160,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop:20,
  },
  saveButton: {
    backgroundColor: Color.colorBlack,
    borderRadius: 15,
    padding: 15,
    width: '40%',
    marginBottom: 10,
  },
  historyButton: {
    backgroundColor: Color.colorBlack,
    borderRadius: 15,
    padding: 15,
    width: '40%',
  },
  buttonText: {
    color: '#fff',
    fontSize: FontSize.size_xl,
    textAlign: 'center',
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  childPosition: {
    borderRadius: Border.br_mini,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  saveButtonChild: {
    backgroundColor: Color.colorBlack,
  },
  submit: {
    color: '#fff', // White text color
    fontWeight: "700", // Bold text
    fontSize: FontSize.size_xl, // Font size from your global styles
    textAlign: 'center', // Center text
    top: '20%'
  },
  historyButtonText: {
    color: '#fff', // White text color
    fontWeight: "700", // Bold text
    fontSize: FontSize.size_xl, // Font size from your global styles
    textAlign: 'center', // Center text
    top: '20%'
  },
  textBoxChild: {
    backgroundColor: Color.colorDarkslategray_200,
  },
  textBox: {
    height: "15.09%",
    width: "88.37%",
    top: "63.09%",
    right: "5.81%",
    bottom: "20.82%",
    color: '#fff',
    paddingHorizontal: 10, // Add horizontal padding
    paddingVertical: 20,
  },
  promptGeneration: {
    backgroundColor: Color.colorGray,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default PromptGeneration;
