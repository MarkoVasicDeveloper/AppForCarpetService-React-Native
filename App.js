import "react-native-gesture-handler";
import React, { useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogIn from "./componnent/LogInPage/LogIn";
import SingUp from "./componnent/SingUpPage/SingUp";
import ReceptionCarpet from "./componnent/ReceptionCarpetPage/ReceptionCarpet";
import WorkerLogIn from "./componnent/WorkerLogInPage/WorkerLogIn";
import WorkerSingUp from "./componnent/WorkerSingUp/WorkerSingUp";
import { UserContext } from "./shared/UserContext";
import MeasuringAndPreparingCarpet from "./componnent/MeasuringAndPreparingCarpet/MeasuringAndPreparingCarpet";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState({
    userId: 0,
    userName: "",
    workerLogIn: false,
    workerId: null,
    workerName: "",
  });

  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <NavigationContainer>
      <UserContext.Provider value={providerUser}>
        {user.workerLogIn ? (
          <Drawer.Navigator initialRouteName="LOG IN">
            <Drawer.Screen name="ReceptionCarpet" component={ReceptionCarpet} />
            <Drawer.Screen
              name="Measuring and preparing carpet"
              component={MeasuringAndPreparingCarpet}
            />
          </Drawer.Navigator>
        ) : (
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
        )}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
