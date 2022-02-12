import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
