import React, { useContext } from "react";
import { View, Text, Button, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextInputCustom from "../../shared/TextInputCustom";
import { useState } from "react";
import api, { saveRefreshToken, saveToken } from "../../api/api";
import Icon from "react-native-vector-icons/FontAwesome5";
import { UserContext } from "../../shared/UserContext";
import styles from "./LogInStyle";

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pay, setPay] = useState(false);
  const [message, setMessage] = useState(false);

  const { user, setUser } = useContext(UserContext);

  function sendData() {
    api(
      "auth/user",
      "post",
      {
        email: email,
        password: password,
      },
      "user"
    )
      .then(async (res) => {
        if (res.data.token !== undefined) {
          await saveToken("user", res.data.token);
          await saveRefreshToken("user", res.data.refreshToken);

          api(`api/user/getUserById/${res.data.Id}`, "post", {}, "user").then(
            (res) => {
              setUser({
                userId: res.data.userId,
                userName: res.data.name,
              });
            }
          );
          api(`api/subscriber/${res.data.Id}`, "get", {}, "user")
            .then((res) => {
              if (
                res.data.length !== 0 &&
                res.data[0].expireAt > new Date().toISOString().split("T")[0]
              ) {
                navigation.navigate("WorkerLogIn");
                return;
              }
              if (res.data.length === 0) {
                var date = new Date();
                date.setDate(date.getDate() + 15);

                api(
                  "api/subscriber/add",
                  "post",
                  {
                    userId: user.userId,
                    timeAt: new Date().toISOString().split("T")[0],
                    expireAt: date.toISOString().split("T")[0],
                    price: 0,
                  },
                  "user"
                )
                  .then(() => {
                    navigation.navigate("WorkerLogIn");
                  })
                  .catch((error) => console.log(error));
              } else {
                setPay(true);
              }
            })
            .catch((error) => console.log(error));
        } else {
          setMessage(true);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/hero-bg.jpg")}
    >
      <View style={styles.backgrgoundView}>
        <View>
          <Text style={styles.title}>LOG IN</Text>
        </View>
        <TextInputCustom
          text="Email:"
          changeText={setEmail}
          value={email}
          name="mail-bulk"
          size={30}
          color="#fec400"
          keyboard="email-address"
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
              sendData();
            }}
          />
        </View>
        <View style={styles.textBottom}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Nemate nalog? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SING UP")}>
            <Text style={{ color: "#fec400", fontSize: 26 }}>Sing Up</Text>
          </TouchableOpacity>
        </View>
        <View
          style={message === true || pay === true ? styles.show : styles.hidden}
        >
          <TouchableOpacity
            onPress={() => {
              setPay(false), setMessage(false);
            }}
          >
            <Icon size={20} name="window-close" color={"#fec400"} />
          </TouchableOpacity>
          <Text style={styles.messageError}>
            {message === true ? "Email adresa ili lozinka nisu tacni!" : ""}
            {pay === true ? "Vasa pretplata je istekla!" : ""}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
