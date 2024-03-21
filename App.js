import React, { Component } from "react";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

export default class App extends Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
    volume: 1.0,
    isBuffering: false,
  };

  async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    });
    this.loadAudio();
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();
    this.setState({
      isPlaying: !isPlaying,
    });
  };

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering,
    });
  };

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const source = require("./music/ukulele.mp3");
    const status = {
      shouldPlay: this.state.isPlaying,
      volume: this.state.volume,
    };
    playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    await playbackInstance.loadAsync(source, status, false);
    this.setState({
      playbackInstance,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Heading}>Aloha Music</Text>
        <Image style={styles.Images} source={require("./images/ukulele.png")} />
        <TouchableOpacity
          style={styles.PlayPauseButton}
          onPress={this.handlePlayPause}
        >
          {this.state.isPlaying ? (
            <Feather name="pause" size={32} color="#000" />
          ) : (
            <Feather name="play" size={32} color="#000" />
          )}
        </TouchableOpacity>
      </View>
    );
  }
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
