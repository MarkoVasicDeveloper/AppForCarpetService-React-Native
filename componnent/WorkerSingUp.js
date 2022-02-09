import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import TextInputCustom from "../shared/TextInputCustom";
import api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkerSingUp = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(false);
  const [required, setRequired] = useState(false);

  async function sendSubmit() {
    if (name === "" || password === "") {
      setRequired(true);
      setMessage(true);
      return;
    }
    api(
      "api/worker/addWorker/" + (await AsyncStorage.getItem("@user")),
      "post",
      {
        password: password,
        name: name,
      },
      "user"
    )
      .then((res) => {
        if (res.data.statusCode === -5001) return setMessage(true);
        navigation.navigate("WorkerLogIn");
      })
      .catch((error) => console.log(error));
  }

  return (
    <ImageBackground
      style={style.background}
      source={require("../assets/hero-bg.jpg")}
    >
      <View style={style.backgroundView}>
        <View>
          <Text style={style.title}>SING UP</Text>
        </View>
        <ScrollView
          style={style.scroll}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View>
            <TextInputCustom
              text="Ime: "
              size={30}
              color="#fec400"
              name="signature"
              value={name}
              changeText={setName}
            />
          </View>

          <View>
            <TextInputCustom
              text="Lozinka: "
              size={30}
              color="#fec400"
              name="signature"
              value={password}
              changeText={setPassword}
            />
          </View>
          <View style={style.buttonView}>
            <Button
              title="Posalji..."
              color={"#fec400"}
              onPress={() => sendSubmit()}
            />
          </View>
        </ScrollView>
        <View style={required === false ? style.hidden : style.showMessage}>
          <TouchableOpacity
            onPress={() => {
              setRequired(false), setMessage(false);
            }}
          >
            <Icon size={20} name="window-close" color={"#fec400"} />
          </TouchableOpacity>
          <Text style={style.text}>
            {message === true ? "Email je zauzet" : ""}
            {required === true ? "Sva polja moraju biti popunjena!" : ""}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#fec400",
    textAlign: "center",
  },
  showMessage: {
    position: "absolute",
    top: 200,
    borderWidth: 1,
    borderColor: "#fec400",
    borderRadius: 20,
    width: "90%",
    height: 100,
    backgroundColor: "#000000dd",
    padding: 5,
  },
  hidden: {
    display: "none",
  },
  buttonView: {
    margin: 10,
  },
  scroll: {
    width: "100%",
  },
  background: {
    flex: 1,
  },
  backgroundView: {
    flex: 1,
    backgroundColor: "#00000099",
    paddingTop: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    color: "#fec400",
  },
});

export default WorkerSingUp;
