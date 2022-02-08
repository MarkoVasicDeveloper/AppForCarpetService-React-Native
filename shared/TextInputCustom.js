import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const TextInputCustom = (props) => {
  return (
    <View style={styles.width}>
      <Text style={{ color: "#fff", fontSize: 20 }}>{props.text} </Text>
      <View style={styles.input}>
        <View style={styles.border}>
          <Icon size={props.size} color={props.color} name={props.name} />
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={props.changeText}
          value={props.value}
          keyboardType={props.keyboard}
        />
      </View>
    </View>
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({
  border: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    color: "#fff",
    flex: 5,
    fontSize: 20,
  },
  width: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#793ea5",
    borderRadius: 20,
    height: 50,
    width: "100%",
    marginTop: 10,
    color: "#ffffffcc",
    paddingLeft: 5,
    flexDirection: "row",
  },
});
