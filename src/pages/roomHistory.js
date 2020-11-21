import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import api from "../services/api";

const Item = ({ temp, humid, date }) => {
  const dataRegistro = new Date(date);
  var dataString =
    ("0" + dataRegistro.getDate()).slice(-2) +
    "/" +
    (dataRegistro.getMonth() + 1) +
    "/" +
    dataRegistro.getFullYear();

  return (
    <View style={styles.item}>
      <View style={styles.dateContainer}>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {dataString}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.itemText}>Temperatura Máxima: {temp}º</Text>
        <Text style={styles.itemText}>Temperatura Minima: {humid}%</Text>
      </View>
    </View>
  );
};

export default function RoomHistory({ route }) {
  const [museuData, setMuseuData] = useState(() => {
    api
      .get("1220924/feeds.json?api_key=DOQLU3B85V4C1V0P&results=10")
      .then((response) => {
        setMuseuData(response.data);
      });
  });

  const renderItem = ({ item }) => {
    if (route.params.sala == 1) {
      return (
        <Item temp={item.field1} humid={item.field2} date={item.created_at} />
      );
    } else if (route.params.sala == 2) {
      return (
        <Item temp={item.field3} humid={item.field4} date={item.created_at} />
      );
    } else {
      return (
        <Item temp={item.field5} humid={item.field6} date={item.created_at} />
      );
    }
  };

  if (!museuData) {
    return (
      <View tyle={styles.indicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            alignSelf: "center",
          }}
        >
          Sala {route.params.sala}
        </Text>
        <StatusBar style="auto" />
        <SafeAreaView style={styles.container}>
          <FlatList
            data={museuData.feeds}
            renderItem={renderItem}
            keyExtractor={(item) => {
              item.entry_id;
            }}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "#f3f5f5",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  infoContainer: {
    width: "60%",
  },
});
