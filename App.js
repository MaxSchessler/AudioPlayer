import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Aloha Music</Text>
      <Image style={styles.Images} source={require("./images/ukulele.png")} />
      <TouchableOpacity
        style={styles.PlayPauseButton}
        onPress={handlePlayPause}
      >
        {isPlaying ? (
          <Feather name="pause" size={32} color="#000" />
        ) : (
          <Feather name="play" size={32} color="#000" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f4e3cf",
  },

  Heading: {
    marginTop: 80,
    fontSize: 36,
    backgroundColor: "#da9547",
    width: 300,
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
    marginBottom: 40,
  },

  Images: {
    height: 500,
    width: 300,
  },

  PlayPauseButton: {
    margin: 30,
  },
});
