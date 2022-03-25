import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
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
    <View style={styles.container}>
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

      <View style={styles.submitButtonStyle}>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={{ color: "#fff" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 3,
  },

  submitButtonStyle: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 10,
  },
});
