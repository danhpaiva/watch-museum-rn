import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import icon from "../images/ic_launcher.png";
import Constants from "expo-constants";

export default function Header({ title, isMain }) {
  const navigation = useNavigation();

  function handleGoBackToAppHome() {
    navigation.navigate("WatchMuseum");
  }

  return (
    <View>
      {title === "RoomHistory" && <View style={styles.gambiarraFoda}></View>}
      <View style={styles.container}>
        {isMain ? (
          <BorderlessButton onPress={navigation.goBack}>
            <Image source={icon} style={styles.image} />
          </BorderlessButton>
        ) : (
          <BorderlessButton onPress={navigation.goBack}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </BorderlessButton>
        )}

        <View></View>

        {isMain ? (
          <BorderlessButton>
            <Feather name="menu" size={24} color="#fff" />
          </BorderlessButton>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 20,
    backgroundColor: "#1c0933",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerSpecial: {
    marginTop: Constants.statusBarHeight,
    height: 60,
    padding: 20,
    backgroundColor: "#1c0933",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 30,
    height: 30,
  },
  gambiarraFoda: {
    height: Constants.statusBarHeight,
    backgroundColor: "#000",
  },
});
