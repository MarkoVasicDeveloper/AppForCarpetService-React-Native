import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
