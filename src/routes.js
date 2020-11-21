import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
import RoomHistory from "./pages/roomHistory.js";
import MuseumLiveUpdate from "./pages/museumLiveUpdate";
import Header from "./components/header";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: true,
          cardStyle: { backgrounColor: "#000" },
        }}
      >
        <Screen
          name="WatchMuseum"
          component={MuseumLiveUpdate}
          options={{
            header: () => <Header isMain={true} title={"WatchMuseum"} />,
          }}
        />
        <Screen
          name="roomHistory"
          component={RoomHistory}
          options={{
            header: () => <Header isMain={false} title={"RoomHistory"} />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
