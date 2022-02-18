import { StyleSheet } from "react-native";

export default StyleSheet.create({
  ImageBackground: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    marginBottom: 10,
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
  holder: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: "#00000055",
    borderColor: "#793ea5",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
  headerInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#ffffff66",
    borderBottomWidth: 2,
  },
  input: {
    borderWidth: 2,
    borderColor: "#793ea5",
    borderRadius: 20,
    height: 50,
    width: "30%",
    height: "60%",
    color: "#ffffffcc",
    paddingLeft: 5,
    flexDirection: "row",
  },
  info: {
    borderBottomColor: "#ffffff55",
    borderBottomWidth: 2,
    paddingVertical: 20,
  },
  darkTheme: {
    backgroundColor: "#00000099",
    flex: 1,
    paddingTop: "5%",
  },
  carpet: {
    flex: 1,
    borderColor: "#793ea5",
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  textInput: {
    color: "#fff",
    flex: 5,
    fontSize: 20,
    textAlign: "center",
  },
  carpetInput: {
    width: "80%",
    height: 350,
    borderColor: "#fec400",
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 30,
    padding: 10,
  },
  carpetInputRow: {
    width: "80%",
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  carpetInputText: {
    borderWidth: 2,
    borderColor: "#fec400",
    borderRadius: 20,
    width: 100,
    color: "#ffffffcc",
    paddingLeft: 5,
    flexDirection: "row",
  },
});