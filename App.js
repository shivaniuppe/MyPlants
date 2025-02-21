import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "/Users/shivaniuppe/Desktop/MyPlants/src/screens/HomeScreen.js";
import PlantListScreen from "/Users/shivaniuppe/Desktop/MyPlants/src/screens/PlantListScreen.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Plant List" component={PlantListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}