import React from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextInputCustom from "../shared/TextInputCustom";
import { useState } from "react";
import api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function WorkerLogIn({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  async function sendSubmit() {
    if ((await AsyncStorage.getItem("@api_tokenuser")) === null)
      return navigation.navigate("LOG IN");
    api(
      "api/worker/findWorker/" + (await AsyncStorage.getItem("@user")),
      "post",
      {
        name: name,
        password: password,
      },
      "user"
    )
      .then(async (res) => {
        if (res.data.statusCode !== -5002 && res.data.statusCode !== -5003) {
          await AsyncStorage.setItem(
            "@workerName",
            JSON.stringify(res.data.name)
          );
          await AsyncStorage.setItem(
            "@workerId",
            JSON.stringify(res.data.workerId)
          );
          navigation.navigate("ReceptionCarpet");
        } else {
          setMessage(true);
        }
      })
      .catch((error) => console.log(error.data));
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/hero-bg.jpg")}
    >
      <View style={styles.backgrgoundView}>
        <View>
          <Text style={styles.title}>WORKER LOG IN</Text>
        </View>
        <TextInputCustom
          text="Ime:"
          changeText={setName}
          value={name}
          name="signature"
          size={30}
          color="#fec400"
        />
        <TextInputCustom
          text="Lozinka:"
          changeText={setPassword}
          value={password}
          name="key"
          size={30}
          color="#fec400"
          keyboard="visible-password"
        />
        <View style={styles.button}>
          <Button
            color={"#fec400"}
            title="Posalji"
            onPress={() => {
              sendSubmit();
            }}
          />
        </View>
        <View style={styles.textBottom}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Nemate nalog? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("WorkerSingUp")}>
            <Text style={{ color: "#fec400", fontSize: 26 }}>Sing Up</Text>
          </TouchableOpacity>
        </View>
        <View style={message === true ? styles.show : styles.hidden}>
          <TouchableOpacity
            onPress={() => {
              setMessage(false);
            }}
          >
            <Icon size={20} name="window-close" color={"#fec400"} />
          </TouchableOpacity>
          <Text style={styles.messageError}>
            {message === true ? "Email adresa ili lozinka nisu tacni!" : ""}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  messageError: {
    color: "#fec400",
    fontSize: 20,
  },
  show: {
    display: "flex",
    width: "80%",
    height: 100,
    borderColor: "#793ea5",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "80%",
    backgroundColor: "#000000cc",
  },
  hidden: {
    display: "none",
  },
  textBottom: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    color: "#fec400",
  },
  button: {
    marginTop: 30,
    flexDirection: "row",
  },
  background: {
    flex: 1,
  },
  backgrgoundView: {
    flex: 1,
    backgroundColor: "#00000099",
    paddingTop: 150,
    alignItems: "center",
  },
});
