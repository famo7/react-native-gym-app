import React, {useState, useEffect} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUp from "./src/screens/SignUp";
import ExerciseScreen from "./src/screens/ExerciseScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "./src/context";

import {
  ApplicationProvider,
  IconRegistry,
  Icon,
  Drawer,
  DrawerItem,
  IndexPath,
  Divider,
} from "@ui-kitten/components";
import theme from './theme.json';
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const Stack = createNativeStackNavigator();
const Dr = createDrawerNavigator();

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};


function App() {
  const [user, setUser] = useState(null);

  const DrawerContent = ({ navigation, state }) => (
    <Drawer
      header={<Divider />}
      selectedIndex={new IndexPath(state.index)}
      onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
    >
      <DrawerItem title="HOME" accessoryLeft={<Icon name="home" />} />
      <DrawerItem
        title="Logout"
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={() => {
          removeItem("user");
          setUser(null);
        }}
      />
    </Drawer>
  );


  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        return jsonValue != null ? setUser(JSON.parse(jsonValue)) : setUser(null);
      } catch (e) {
        console.log(e);
      }
    };
    getData()

  }, [])
  

 function MyDrawer() {
    return (
      <Dr.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#222B45",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Dr.Screen name="Home" options={{ title: "WorkoutList" }}>
          {(props) => <HomeScreen {...props} setUser={setUser} user={user} />}
        </Dr.Screen>
        <Dr.Screen name="Setting" options={{ title: "Settings" }}>
          {(props) => (
            <SettingScreen {...props} setUser={setUser} user={user} />
          )}
        </Dr.Screen>
      </Dr.Navigator>
    );
 }
  
  return (
    <>
      <UserContext.Provider value={user}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#222B45",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            >
              {user === null ? (
                <>
                  <Stack.Screen name="Login" options={{ title: "Login" }}>
                    {(props) => (
                      <LoginScreen {...props} setUser={setUser} user={user} />
                    )}
                  </Stack.Screen>
                  <Stack.Screen name="SignUp" component={SignUp} />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Dashboard"
                    component={MyDrawer}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="Exercises" component={ExerciseScreen} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
