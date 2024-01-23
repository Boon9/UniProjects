import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

type Subject = 'Maths' | 'Science' | 'Food' | 'Geography' | 'Sports' | 'Coding';

const subjectFacts = {
  "Maths": [
    "Zero is the only integer that cannot be represented by Roman numerals.",
    "A 'jiffy' is an actual unit of time for 1/100th of a second.",
    "The number 'googol' is 1 followed by 100 zeros.",
    "The symbol for division (÷) is called an obelus.",
    "The word 'hundred' comes from the Old Norse term, 'hundrath', meaning 120, not 100.",
    "In a room of 23 people, there's a 50% chance that two people have the same birthday.",
    "A 'googolplex' is the number 1 followed by a googol of zeros.",
    "The largest known prime number, as of 2023, has 24,862,048 digits.",
    "Pythagoras' Theorem is a² + b² = c², where 'c' is the hypotenuse of a right triangle.",
    "The number pi (π) is irrational, meaning it cannot be expressed as a simple fraction.",
    "An icosahedron is a solid figure with 20 flat faces.",
    "Euler's identity, e^(iπ) + 1 = 0, is often cited as the most beautiful theorem in mathematics.",
    "Fibonacci sequence is a series where each number is the sum of the two preceding ones.",
    "The sum of any two sides of a triangle is always greater than the length of the third side.",
    "In mathematics, an 'imaginary number' is a number that can be written as a real number multiplied by the imaginary unit 'i', which is defined by its property i² = −1."
  ],
  "Science": [
    "Octopuses have three hearts.",
    "Butterflies taste with their feet.",
    "A single lightning bolt can heat the air around it to temperatures five times hotter than the sun's surface.",
    "The average cumulus cloud weighs around 1.1 million pounds.",
    "Bananas are berries, but strawberries aren't.",
    "It takes 8 minutes and 20 seconds for light to travel from the Sun to the Earth.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.",
    "Sharks have been around longer than trees. Sharks date back to 400 million years ago, while the earliest tree lived around 350 million years ago.",
    "A group of flamingos is called a 'flamboyance'.",
    "The human nose can remember up to 50,000 different scents.",
    "Water can boil and freeze at the same time, a phenomenon known as the 'triple point'.",
    "Venus is the only planet in our solar system that rotates clockwise.",
    "The pressure at the deepest point in the oceans, the Mariana Trench, is over 1,000 times the standard atmospheric pressure at sea level.",
    "A full NASA space suit costs $12 million, with the backpack and helmet accounting for 70% of the cost.",
    "The Earth's core is as hot as the surface of the sun, reaching temperatures of about 5,700 degrees Celsius (10,300 degrees Fahrenheit)."
  ],
  "Food": [
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible.",
    "Apples belong to the rose family, as do pears and plums.",
    "Peanuts aren't nuts; they are legumes, related to beans and lentils.",
    "The fear of cooking is known as Mageirocophobia and is a recognized phobia.",
    "Chocolate was once used as currency by the Aztecs.",
    "Square watermelons are grown by Japanese farmers for easier stack and store.",
    "Saffron, used as a spice, is more expensive per gram than gold due to the labor-intensive process of harvesting.",
    "The hottest part of a chili pepper is not the seeds, as many believe, but the white pith that surrounds the seeds.",
    "The first food eaten in space by an American astronaut was applesauce.",
    "Tomatoes are the world’s most popular fruit. More tomatoes are eaten around the world than any other fruit.",
    "The longest recorded flight of a chicken is 13 seconds.",
    "There are over 7,500 varieties of apples worldwide.",
    "Cucumbers are 96% water, making them one of the most hydrating vegetables to eat.",
    "The world's largest pizza was made in Rome and measured 1,261 square meters.",
    "Vanilla is the second most expensive spice after saffron because growing the vanilla seed pods is labor-intensive."
  ],
  "Geography": [
    "Canada has the longest coastline of any country in the world.",
    "Mount Everest grows by about 4mm every year due to tectonic movements.",
    "Russia spans 11 time zones, more than any other country.",
    "Vatican City is the smallest country in the world.",
    "Lake Baikal in Russia is the world's deepest and oldest freshwater lake.",
    "The Dead Sea is currently Earth's lowest elevation on land.",
    "The Great Barrier Reef in Australia is the world's largest coral reef system.",
    "The Sahara Desert is the largest hot desert in the world.",
    "The Amazon River is the second-longest river in the world after the Nile.",
    "The Himalayas contain the world's highest peaks, including Mount Everest.",
    "Antarctica is the coldest, windiest, and driest continent on Earth.",
    "The Nile River is often considered the longest river in the world.",
    "The Grand Canyon in the United States is one of the world's most famous natural wonders.",
    "The Great Wall of China is the longest wall in the world and can be seen from space.",
    "The Pacific Ocean is the largest and deepest ocean on Earth.",
  ],
  "Sports": [
    "Basketball was invented by James Naismith in 1891.",
    "The fastest recorded tennis serve was 263.4 km/h (163.7 mph) by Samuel Groth.",
    "Olympic gold medals are mostly made of silver.",
    "In 1967, Kathrine Switzer was the first woman to run the Boston Marathon.",
    "FIFA World Cup was first held in 1930, hosted by Uruguay.",
    "The original Olympic Games were held every four years in Olympia, Greece, as early as 776 BC.",
    "Usain Bolt holds the world record for the fastest 100m sprint, completing it in 9.58 seconds.",
    "The Super Bowl is one of the most-watched sporting events in the United States every year.",
    "Tennis legend Serena Williams has won 23 Grand Slam singles titles, the most by any player in the Open Era.",
    "Muhammad Ali, originally named Cassius Clay, is considered one of the greatest boxers of all time.",
    "Cricket is one of the most popular sports in India, with a massive following.",
    "The Tour de France is one of the most prestigious bicycle races, covering over 2,000 miles each year.",
    "Golf's Masters Tournament is held annually at Augusta National Golf Club and is one of the sport's major championships.",
    "The longest recorded golf drive is 515 yards, achieved by Mike Austin in 1974.",
    "Table tennis, also known as ping pong, originated in England during the late 19th century.",
  ],
  "Coding": [
    "The first computer programmer was Ada Lovelace in the 19th century.",
    "The first computer virus was created in 1971 and called the 'Creeper' virus.",
    "The term 'bug' in programming originated from a real moth found in a computer by Grace Hopper.",
    "There are over 700 different programming languages.",
    "The first game developed in a computer lab was 'Spacewar!' in 1962.",
    "Java is named after the Java coffee, commonly consumed by the language's creators.",
    "Python is named after the British comedy group Monty Python.",
    "The C programming language was created by Dennis Ritchie at Bell Labs in the early 1970s.",
    "HTML (Hypertext Markup Language) is the standard markup language used to create web pages.",
    "JavaScript is not related to Java; it was originally called LiveScript.",
    "The Linux operating system was created by Linus Torvalds in 1991.",
    "The World Wide Web was invented by Tim Berners-Lee in 1989.",
    "SQL (Structured Query Language) is used for managing and querying relational databases.",
    "Alan Turing is considered one of the founding fathers of computer science.",
    "The first computer mouse was invented by Douglas Engelbart in 1964."
  ]
};



const MainMenu = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();


  const handleSubjectPress = (subject: Subject) => {
    const facts = subjectFacts[subject];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    navigation.navigate("PromptGeneration", { fact: randomFact });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Generate Better Prompts</Text>
        <Text style={styles.subtitle}>Try the features below</Text>
      </View>

      <View style={styles.subjectsContainer}>

        <TouchableOpacity
          style={styles.subjectButton}
          activeOpacity={0.2}
          onPress={() => handleSubjectPress("Science")}
        >
          <Image
            style={styles.subjectImage}
            source={require("../assets/rectangle-11.png")} // Update with your science icon asset
          />
          <Text style={styles.subjectText}>Science</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subjectButton}
          activeOpacity={0.2}
          onPress={() => handleSubjectPress("Maths")}
        >
          <Image
            style={styles.subjectImage}
            source={require("../assets/rectangle-12.png")}
          />
          <Text style={styles.subjectText}>Maths</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subjectButton}
          activeOpacity={0.2}
          onPress={() => handleSubjectPress("Food")}
        >
          <Image
            style={styles.subjectImage}
            source={require("../assets/rectangle-13.png")}
          />
          <Text style={styles.subjectText}>Food</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subjectButton}
          activeOpacity={0.2}
          onPress={() => handleSubjectPress("Geography")}
        >
          <Image
            style={styles.subjectImage}
            source={require("../assets/rectangle-15.png")}
          />
          <Text style={styles.subjectText}>Places</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subjectButton}
          activeOpacity={0.2}
          onPress={() => handleSubjectPress("Sports")}
        >
          <Image
            style={styles.subjectImage}
            source={require("../assets/rectangle-14.png")}
          />
          <Text style={styles.subjectText}>Sports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subjectButton}
          activeOpacity={0.2}
          onPress={() => handleSubjectPress("Coding")}
        >
          <Image
            style={styles.subjectImage}
            source={require("../assets/rectangle-16.png")}
          />
          <Text style={styles.subjectText}>Coding</Text>
        </TouchableOpacity>

        </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGray,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.size_xl,
    fontWeight: 'bold',
    color: Color.colorWhite,
    fontFamily: FontFamily.sourceSans3SemiBold,
  },
  subtitle: {
    fontSize: FontSize.size_lg,
    color: Color.colorWhite,
    fontFamily: FontFamily.sourceSans3Regular,
    marginBottom: 16,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  subjectButton: {
    backgroundColor: Color.colorDarkslategray_100,
    width: '48%',
    height: '29%',
    marginVertical: 8,
    alignItems: 'center',
    padding: 16,
    borderRadius: Border.br_mini,
  },
  subjectImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  subjectText: {
    fontSize: FontSize.size_5xl,
    color: Color.colorWhite,
    fontFamily: FontFamily.sourceSans3Regular,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Color.colorDarkslategray_200,
  },
  navButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  navIcon: {
    width: 36,
    height: 36,
  },
});

export default MainMenu;
