import * as React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Game } from "../../types/index";
import axios from "axios";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Text, View, ScrollableLayout } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { processGenres } from "../../components/games/GameListItem";
import GameSuggestionContainer from "../../components/home/GameSugestionContainer";

export default function GamePage({ route, navigation }) {
  const colorScheme = useColorScheme();

  const gameInfo = route.params;

  return (
    <ScrollableLayout style={styles.scrollContainer}>
      <View
        style={[
          styles.rowContainer,
          { justifyContent: "space-between", marginBottom: 32, marginTop: 64 },
        ]}
      >
        <View style={styles.rowContainer}>
          <Image
            style={styles.icon}
            source={{
              uri: gameInfo.icon,
            }}
          />
          <View style={[styles.gameDetails]}>
            <Text style={[styles.h1, styles.gameName]}>{gameInfo.name}</Text>
            <Text
              style={[
                styles.p,
                styles.gameName,
                { color: Colors[colorScheme].header },
              ]}
            >
              {gameInfo.genres ? processGenres(gameInfo.genres) : ""}
            </Text>
            <Text
              style={[
                styles.p,
                { fontStyle: "italic", color: Colors[colorScheme].header },
              ]}
            >
              {gameInfo.publishers ? gameInfo.publishers[0] : ""}
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={bookmarkGame}>
            <FontAwesome
              name="bookmark-o"
              style={{ color: Colors[colorScheme].primary }}
              size={28}
            >
              {" "}
            </FontAwesome>
          </TouchableOpacity>

          <TouchableOpacity onPress={shareGame}>
            <Ionicons
              name="ios-share"
              style={{ color: Colors[colorScheme].primary, marginTop: 16 }}
              size={32}
            >
              {" "}
            </Ionicons>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.rowContainer, { marginBottom: 32 }]}>
        <Ionicons
          name="md-person"
          style={{ marginRight: 16, color: Colors[colorScheme].header }}
          size={32}
        ></Ionicons>
        <Text style={(styles.p, { color: Colors[colorScheme].header })}>
          {generatePlayers()}
        </Text>
      </View>

      <Text
        style={[
          styles.p,
          { color: Colors[colorScheme].header, marginBottom: 32 },
        ]}
      >
        {gameInfo.description ? extractDescription(gameInfo.description) : ""}
      </Text>

      <ScrollView
        horizontal
        contentContainerStyle={[styles.rowContainer, { marginBottom: 32 }]}
      >
        {gameInfo.media ? (
          processMedia(gameInfo.media).map((link) => (
            <Image
              style={styles.media}
              key={link}
              source={{
                uri: link,
              }}
            />
          ))
        ) : (
          <></>
        )}
      </ScrollView>

      <Text style={styles.h2}>Platforms</Text>
      <View style={[styles.rowContainer, { marginBottom: 24 }]}>
        {gameInfo.platforms ? (
          processPlatforms(gameInfo.platforms).map((platform) => {
            return (
              <View
                key={platform}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {platformIcon(platform)}
                <Text style={[{ marginRight: 16 }, styles.p]}>{platform}</Text>
              </View>
            );
          })
        ) : (
          <></>
        )}
      </View>

      <Text style={[styles.h2, { marginBottom: 12 }]}>You May Like</Text>
      <GameSuggestionContainer></GameSuggestionContainer>
      <View style={{ marginBottom: 20 }}></View>
    </ScrollableLayout>
  );
}

function extractDescription(desc) {
  // reference: https://stackoverflow.com/questions/822452/strip-html-from-text-javascript
  desc = desc.replace(/<br>/gm, "\n");
  // desc = desc.replace(/<\/h2>/gm, "\n");
  desc = desc.replace(/<h2 class="bb_tag">/gm, "\n");

  return (
    desc.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "").slice(0, 350) + "..."
  );
}
function processMedia(media) {
  media = media.slice(0, 3);
  const processed = media.map((m) => {
    return m.path_thumbnail;
  });
  return processed;
}
function processPlatforms(platforms) {
  let buttons = [];
  if (platforms.windows) {
    buttons.push("Windows");
  }
  if (platforms.linux) {
    buttons.push("Linux");
  }
  if (platforms.mac) {
    buttons.push("Mac");
  }
  return buttons;
}
function platformIcon(platform) {
  let icon;
  if (platform == "Mac") {
    icon = (
      <FontAwesome
        name="apple"
        style={{ color: Colors.light.primary, marginRight: 8 }}
        size={24}
      ></FontAwesome>
    );
  } else {
    icon = (
      <FontAwesome
        name={platform.toLowerCase()}
        style={{ color: Colors.light.primary, marginRight: 8 }}
        size={24}
      ></FontAwesome>
    );
  }
  return icon;
}
function bookmarkGame() {
  return;
}
function shareGame() {
  return;
}

function generatePlayers() {
  let min = Math.ceil(1);
  let max = Math.floor(4);
  const minPlayers = Math.floor(Math.random() * (max - min + 1) + min);
  min = Math.ceil(5);
  max = Math.floor(8);
  const maxPlayers = Math.floor(Math.random() * (max - min + 1) + min);

  return `${minPlayers} - ${maxPlayers} players`;
}

const styles = StyleSheet.create({
  button: {},
  scrollContainer: {
    // paddingTop: 64,
    overflow: "visible",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  icon: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  media: {
    width: 200,
    height: 130,
    borderRadius: 8,
    marginRight: 24,
  },

  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflow: "visible",
  },
  h1: {
    fontWeight: "bold",
    fontSize: 24,

    marginBottom: 4,
  },
  gameName: {
    maxWidth: 190,
  },
  h2: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 8,
  },
  p: { fontSize: 16, lineHeight: 25 },
  gameDetails: {},
});