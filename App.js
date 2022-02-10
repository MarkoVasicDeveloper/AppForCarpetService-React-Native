import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "./componnent/LogIn";
import SingUp from "./componnent/SingUp";
import ReceptionCarpet from "./componnent/ReceptionCarpetPage/ReceptionCarpet";
import WorkerLogIn from "./componnent/WorkerLogIn";
import WorkerSingUp from "./componnent/WorkerSingUp";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LOG IN"
          component={LogIn}
          options={{
            headerTransparent: true,
            headerTintColor: "#fec400",
            headerStyle: { height: 100 },
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="SING UP"
          component={SingUp}
          options={{
            headerTransparent: true,
            headerTintColor: "#fec400",
            headerStyle: { height: 100 },
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="ReceptionCarpet"
          component={ReceptionCarpet}
          options={{
            headerTransparent: true,
            headerTintColor: "#fec400",
            headerStyle: { height: 100 },
          }}
        />
        <Stack.Screen
          name="WorkerLogIn"
          component={WorkerLogIn}
          options={{
            headerTransparent: true,
            headerTintColor: "#fec400",
            headerStyle: { height: 100 },
          }}
        />

        <Stack.Screen
          name="WorkerSingUp"
          component={WorkerSingUp}
          options={{
            headerTransparent: true,
            headerTintColor: "#fec400",
            headerStyle: { height: 100 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
