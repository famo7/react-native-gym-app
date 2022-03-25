import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Input, Layout, Button} from "@ui-kitten/components";
import userService from "../services/userService"
export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
       await userService.createUser({
        name: name,
        username: userName,
        password: password,
      });
      navigation.navigate("Login")
    } catch (error) {
      console.log("Error");
    }
    

    
  };
  return (
    <Layout style={styles.container}>
      <Input
        placeholder="full name"
        value={name}
        onChangeText={(val) => setName(val)}
      />
      <Input
        placeholder="username"
        value={userName}
        onChangeText={(val) => setUserName(val)}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(val) => setPassword(val)}
      />

      <Layout >
        <Button onPress={handleSubmit}>Sign up</Button>
      </Layout>
      
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  }, 
});
