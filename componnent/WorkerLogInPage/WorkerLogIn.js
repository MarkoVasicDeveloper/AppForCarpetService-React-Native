import React, { useContext } from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextInputCustom from "../../shared/TextInputCustom";
import { useState } from "react";
import api from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";
import { UserContext } from "../../shared/UserContext";
import styles from "./WorkerLogInPage";

export default function WorkerLogIn({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const { user, setUser } = useContext(UserContext);

  async function sendSubmit() {
    if ((await AsyncStorage.getItem("@api_tokenuser")) === null)
      return navigation.navigate("LOG IN");
    api(
      `api/worker/findWorker/${user.userId}`,
      "post",
      {
        name: name,
        password: password,
      },
      "user"
    )
      .then((res) => {
        if (res.data.statusCode !== -5002 && res.data.statusCode !== -5003) {
          setUser({
            ...user,
            workerName: res.data.name,
            workerId: res.data.workerId,
            workerLogIn: true,
          });
          navigation.navigate("ReceptionCarpet");
          return;
        }
        setMessage(true);
      })
      .catch((error) => console.log(error.data));
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/hero-bg.jpg")}
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
