import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);

  useEffect(() => {
    async function setupAudio() {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playThroughEarpieceAndroid: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });
      loadAudio();
    }
    setupAudio();
  }, []);

  // async function to handle the playpause event when the touchable opacity is pressed.
  const handlePlayPause = async () => {
    // if playbackInstance is not null:
    // asynchronously pause if isPlaying is true : asynchronously play if isPlaying is false - music is paused
    if (playbackInstance) {
      isPlaying
        ? await playbackInstance.pauseAsync()
        : await playbackInstance.playAsync();
      // update boolen isPlaying state var
      setIsPlaying(!isPlaying);
    }
  };

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering,
    });
  };

  // aysnc loadAudio()
  // instanciate new Audio.Sound() object and set the source to be the mp3 in music file
  const loadAudio = async () => {
    const playbackInstance = new Audio.Sound();
    playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await playbackInstance.loadAsync(
      "music/ukulele.mp3",
      { shouldPlay: isPlaying, volume: 1 },
      false
    );
    setPlaybackInstance(playbackInstance);
  };

  // JSX Component
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
