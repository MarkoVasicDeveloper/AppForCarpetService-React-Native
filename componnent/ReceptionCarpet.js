import React from "react";
import {
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TextInputCustom from "../shared/TextInputCustom";

const ReceptionCarpet = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/hero-bg.jpg")}
    >
      <View style={styles.darkTheme}>
        <View style={styles.header}>
          <View style={styles.text}>
            <Text style={styles.text}>Korisnik: </Text>
            <Text style={styles.textDinamic}>Marko </Text>
          </View>
          <View>
            <Text style={styles.text}>Radnik: </Text>
            <Text style={styles.textDinamic}>Marko </Text>
          </View>
          <View>
            <Button title="Odjava Radnika" color={"#fec400"} />
          </View>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <View>
                <Text
                  style={{
                    color: "#eee",
                    fontSize: 30,
                    fontWeight: "bold",
                    marginVertical: 20,
                    marginLeft: 10,
                  }}
                >
                  Prijem tepiha
                </Text>
              </View>
              <View style={styles.clientHolder}>
                <Text
                  style={{
                    color: "#eee",
                    fontSize: 25,
                    fontStyle: "italic",
                  }}
                >
                  Podaci o klijentu
                </Text>
                <TextInputCustom
                  text="Ime:"
                  name="file-signature"
                  size={30}
                  color="#fec400"
                />
                <TextInputCustom
                  text="Prezime:"
                  name="file-signature"
                  size={30}
                  color="#fec400"
                />
                <TextInputCustom
                  text="Adresa:"
                  name="address-card"
                  size={30}
                  color="#fec400"
                />
                <TextInputCustom
                  text="Telefon:"
                  name="phone"
                  size={30}
                  color="#fec400"
                />
              </View>
            </View>
            <View>
              <View style={styles.clientHolder}>
                <Text
                  style={{
                    color: "#eee",
                    fontSize: 25,
                    fontStyle: "italic",
                    marginVertical: 10,
                  }}
                >
                  Popis tepiha
                </Text>
                <TextInputCustom
                  text="Broj tepiha:"
                  name="list-ol"
                  size={30}
                  color="#fec400"
                />
                <TextInputCustom
                  text="Broj staza:"
                  name="list-ol"
                  size={30}
                  color="#fec400"
                />
                <View style={{ marginVertical: 20, width: "50%" }}>
                  <Button title="Posalji..." color={"#793ea5"} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.containerSavedData}>
            <View>
              <Text
                style={{
                  color: "#ccc",
                  fontSize: 25,
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                ID broj klijenta je:
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: "#ccc",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Ime:
              </Text>
              <Text
                style={{
                  color: "#ccc",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Prezime:
              </Text>
              <Text
                style={{
                  color: "#ccc",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Adresa:
              </Text>
              <Text
                style={{
                  color: "#ccc",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Telefon:
              </Text>
              <Text
                style={{
                  color: "#ccc",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Broj tepiha:
              </Text>
              <Text
                style={{
                  color: "#ccc",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 40,
                }}
              >
                Broj staza:
              </Text>
            </View>

            <View
              style={{
                borderColor: "#fec400",
                borderWidth: 1,
                borderRadius: 20,
                marginBottom: 20,
              }}
            >
              <Button title="Izmenite podatke..." color={"transparent"} />
            </View>

            <View style={styles.visitContainer}>
              <View>
                <Text style={{ color: "#eee", fontSize: 20, marginBottom: 10 }}>
                  Posete klijenta nasem servisu:
                </Text>
              </View>
              <View style={styles.visitInfo}>
                <Text style={{ color: "#eee" }}>Datum:</Text>
                <Text style={{ color: "#eee" }}>Broj tepiha:</Text>
                <Text style={{ color: "#eee" }}>Broj staza:</Text>
              </View>
              <View style={styles.visitInfo}>
                <Text style={{ color: "#eee" }}>Datum:</Text>
                <Text style={{ color: "#eee" }}>Broj tepiha:</Text>
                <Text style={{ color: "#eee" }}>Broj staza:</Text>
              </View>
              <View style={styles.visitInfo}>
                <Text style={{ color: "#eee" }}>Datum:</Text>
                <Text style={{ color: "#eee" }}>Broj tepiha:</Text>
                <Text style={{ color: "#eee" }}>Broj staza:</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default ReceptionCarpet;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  darkTheme: {
    backgroundColor: "#00000099",
    flex: 1,
    paddingTop: "20%",
  },
  header: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 20,
    color: "#f5f5f5",
  },
  textDinamic: {
    fontSize: 25,
    color: "#ffff",
    fontWeight: "bold",
  },
  clientHolder: {
    alignItems: "center",
  },
  container: {
    padding: 10,
    margin: 10,
    borderColor: "#793ea5",
    borderWidth: 2,
    borderRadius: 20,
  },
  containerSavedData: {
    padding: 20,
    margin: 10,
    borderColor: "#fec400",
    borderWidth: 2,
    borderRadius: 20,
  },
  visitContainer: {
    borderColor: "#aaa",
    borderWidth: 2,
    marginTop: 10,
    padding: 5,
  },
  visitInfo: {
    borderColor: "#fec400",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
});
