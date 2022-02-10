import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
    backgroundColor: "#000000cc",
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
  IDtekst: {
    color: "#ccc",
    fontSize: 20,
    fontWeight: "bold",
  },
});
