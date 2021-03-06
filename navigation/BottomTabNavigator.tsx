import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from "@react-navigation/stack";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import GlobalStyles from "../constants/GlobalStyles";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GamesHome from "../screens/GamesHome";
import AccountScreen from "../screens/profile/AccountScreen";
import GameResults from "../screens/GameResults";
import {
  BottomTabParamList,
  HomeParamList,
  ProfileParamList,
  GamesHomeParamList,
  SocialParamList,
} from "../types/navigation";
import SocialScreen from "../screens/SocialScreen";
import ChatScreen from "../screens/social/ChatScreen";
import GamePage from "../screens/game-page/GamePage";
import { AppContext } from "../context";
import ChangeEmailScreen from "../screens/profile/AccountScreens/ChangeEmailScreen";
import DevicesScreen from "../screens/profile/AccountScreens/DevicesScreen";
import AccessibilityScreen from "../screens/profile/AccountScreens/AccessibilityScreen";
import GenreScreen from "../screens/profile/AccountScreens/GenreScreen";
import LanguagesScreen from "../screens/profile/AccountScreens/LanguagesScreen";
import ChangePasswordScreen from "../screens/profile/AccountScreens/ChangePasswordScreen";
import savedGamesScreen from "../screens/profile/savedGames/savedGamesScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].primary }}
      // style={styles.bottomNav}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Games"
        component={GamesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="logo-game-controller-b" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Social"
        component={SocialNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-people" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-person" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "For You",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <HomeStack.Screen
        name="GamePageHome"
        component={GamePage}
        options={{
          headerTitle: "",
          headerStyle: styles.headerContainer,
        }}
      />
    </HomeStack.Navigator>
  );
}

const SocialStack = createStackNavigator<SocialParamList>();

function SocialNavigator() {
  const { currChatReceiver } = useContext(AppContext);

  return (
    <SocialStack.Navigator>
      <SocialStack.Screen
        name="SocialScreen"
        component={SocialScreen}
        options={{
          headerTitle: "Social",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <SocialStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerTitle: currChatReceiver
            ? `${currChatReceiver?.firstName} ${currChatReceiver?.lastName}`
            : "Social",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
    </SocialStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: "Profile",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <ProfileStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerTitle: "Account",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <ProfileStack.Screen
        name="ChangeEmailScreen"
        component={ChangeEmailScreen}
        options={{
          headerTitle: "Change Email",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <ProfileStack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerTitle: "Change Password",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <ProfileStack.Screen
        name="DevicesScreen"
        component={DevicesScreen}
        options={{
          headerTitle: "Operating Systems and Devices",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <ProfileStack.Screen
        name="AccessibilityScreen"
        component={AccessibilityScreen}
        options={{
          headerTitle: "Accessibility Preferences",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <ProfileStack.Screen
        name="GenreScreen"
        component={GenreScreen}
        options={{
          headerTitle: "Genre Preferences",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <ProfileStack.Screen
        name="LanguagesScreen"
        component={LanguagesScreen}
        options={{
          headerTitle: "Language Support Preferences",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <ProfileStack.Screen
        name="SavedGames"
        component={savedGamesScreen}
        options={{
          headerTitle: "Bookmarked Games",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
    </ProfileStack.Navigator>
  );
}

const GamesStack = createStackNavigator<GamesHomeParamList>();

function GamesNavigator() {
  return (
    <GamesStack.Navigator>
      <GamesStack.Screen
        name="GamesHome"
        component={GamesHome}
        options={{
          headerTitle: "Games",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
      <GamesStack.Screen
        name="GamePage"
        component={GamePage}
        options={{
          headerTitle: "",
          headerStyle: styles.headerContainer,
        }}
      />
      <GamesStack.Screen
        name="GamePageHome"
        component={GamePage}
        options={{
          headerTitle: "",
          headerStyle: styles.headerContainer,
        }}
      />
      <GamesStack.Screen
        name="ResultsPage"
        component={GameResults}
        options={{
          headerTitle: "Search Results",
          headerTitleAlign: "left",
          headerTitleStyle: styles.headerText,
          headerStyle: styles.headerContainer,
        }}
      />
    </GamesStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerText: {
    ...GlobalStyles.styles.textHeader,
    fontWeight: "700",
    paddingLeft: 4,
  },
  headerContainer: {
    height: 120,
  },
});
