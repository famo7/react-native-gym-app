import React, {useState} from 'react'
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "../services/userService"
import { Input, Layout, Button } from "@ui-kitten/components";

export default function LoginScreen({navigation, setUser, user}) {
  
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

   

    const handleSubmit = async () =>{
       
         const response = await userService.login({
           username: userName,
           password: password,
         });
         setUser(response);

         try {
           const jsonValue = JSON.stringify(response);
           await AsyncStorage.setItem("user", jsonValue);
         } catch (e) {
           console.log(e);
         }      
    }
  return (
    <Layout style={{ height: "100%" }}>
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
        <Button style={styles.button} onPress={handleSubmit} >
          Sign in
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
          appearance="ghost"
        >
          Sign up
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    
  },
});