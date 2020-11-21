import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  RefreshControl
} from "react-native";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function RoomHistory() {
  const navigation = useNavigation();

  const [museuData, setMuseuData] = useState(() => {
    api
      .get("1218298/feeds.json?api_key=XRQD7C1VLCSHF0DD&results=1")
      .then((response) => {
        setMuseuData(response.data);
      });
  });

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setMuseuData(() => {
      api
        .get("1218298/feeds.json?api_key=XRQD7C1VLCSHF0DD&results=1")
        .then((response) => {
          setMuseuData(response.data);
        });
    });;
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const dataAtual = new Date();

  function handleNextPage(sala) {
    navigation.navigate("roomHistory", { sala: sala });
  }

  function getRoomStyle(room) {
    if (room == 1) {
      if (museuData.feeds[0].field2 > 70) {
        return styles.salaContainerAlert;
      } else {
        return styles.salaContainer;
      }
    } else if (room == 2) {
      if (museuData.feeds[0].field4 > 70) {
        return styles.salaContainerAlert;
      } else {
        return styles.salaContainer;
      }
    } else {
      if (museuData.feeds[0].field6 > 70) {
        return styles.salaContainerAlert;
      } else {
        return styles.salaContainer;
      }
    }
  }

  if (!museuData) {
    return (
      <View tyle={styles.indicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.main}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.userContainer}>
            <Text style={styles.h1}>Olá, Museu user</Text>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {dataAtual.getDate()}/{dataAtual.getMonth() + 1}
              </Text>
              <Text>
                {dataAtual.getHours()}h{dataAtual.getMinutes()}
              </Text>
            </View>
          </View>

          <View style={styles.mapContainer}>
            <TouchableNativeFeedback onPressOut={() => handleNextPage(1)}>
              <View style={getRoomStyle(1)}>
                {museuData.feeds[0].field2 > 70 && (
                  <View style={styles.alertIcon}>
                    <Feather name="alert-triangle" size={20} color="#fff" />
                  </View>
                )}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Sala 01
                </Text>
                <Text>Temperatura:</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {museuData.feeds[0].field1}º
                </Text>
                <Text>Umidade:</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {museuData.feeds[0].field2}%
                </Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPressOut={() => handleNextPage(2)}>
              <View style={getRoomStyle(2)}>
                {museuData.feeds[0].field4 > 70 && (
                  <View style={styles.alertIcon}>
                    <Feather name="alert-triangle" size={20} color="#fff" />
                  </View>
                )}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Sala 02
                </Text>
                <Text>Temperatura:</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {museuData.feeds[0].field3}º
                </Text>
                <Text>Umidade:</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {museuData.feeds[0].field4}%
                </Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPressOut={() => handleNextPage(3)}>
              <View style={getRoomStyle(3)}>
                {museuData.feeds[0].field6 > 70 && (
                  <View style={styles.alertIcon}>
                    <Feather name="alert-triangle" size={20} color="#fff" />
                  </View>
                )}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Sala 03
                </Text>
                <Text>Temperatura:</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {museuData.feeds[0].field5}º
                </Text>
                <Text>Umidade:</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {museuData.feeds[0].field6}%
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.snackbarContainer}>
            {museuData.feeds[0].field2 > 70 && (
              <View style={styles.snackbar}>
                <Feather name="alert-triangle" size={20} color="#ec4b58" />
                <Text style={styles.snackbarText}>
                  A umidade da sala 1 está acima da esperada
                </Text>
              </View>
            )}
            {museuData.feeds[0].field4 > 70 && (
              <View style={styles.snackbar}>
                <Feather name="alert-triangle" size={20} color="#ec4b58" />
                <Text style={styles.snackbarText}>
                  A umidade da sala 2 está acima da esperada
                </Text>
              </View>
            )}
            {museuData.feeds[0].field6 > 70 && (
              <View style={styles.snackbar}>
                <Feather name="alert-triangle" size={20} color="#ec4b58" />
                <Text style={styles.snackbarText}>
                  A umidade da sala 3 está acima da esperada
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#f3f5f5",
  },
  h1: {
    width: "50%",
    fontSize: 20,
    color: "#333",
  },
  userContainer: {
    height: 80,
    marginBottom: -10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  salaContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  salaContainerAlert: {
    width: 150,
    height: 150,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ec4b58",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  mapContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 50,
  },
  alertIcon: {
    position: "absolute",
    top: -12,
    left: 10,
    backgroundColor: "#ec4b58",
    borderRadius: 30,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  snackbar: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 15,
    borderColor: "#ec4b58",
    marginTop: 10,
  },
  snackbarText: {
    color: "#ec4b58",
    fontWeight: "bold",
  },
  snackbarContainer: {
    padding: 15,
  },
});
