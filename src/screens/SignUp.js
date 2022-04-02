import React, { useState } from "react";
import {
  StyleSheet
} from "react-native";
import { Input, Layout, Button, Text} from "@ui-kitten/components";
import userService from "../services/userService"
import validate from "../validate";
export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    try {
      await validate.userSchema.validate({
        name,
        userName,
        password,
      });
      try {
        await userService.createUser({
          name: name,
          username: userName,
          password: password,
        });
        navigation.navigate("Login");
      } catch (error) {
        console.log("Error");
      }
    } catch (error) {
        setError(error.message);
        
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

      <Layout>
        <Button onPress={handleSubmit}>Sign up</Button>
      </Layout>
      <Layout style={{flexDirection:"row", justifyContent:"center"}}>
        <Text status="danger">{error}</Text>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  }, 
});
