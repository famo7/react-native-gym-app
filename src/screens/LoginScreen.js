import React, {useState} from 'react'
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "../services/userService"
import { Input, Layout, Button, Spinner, Text } from "@ui-kitten/components";

export default function LoginScreen({navigation, setUser, user}) {
  
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");


    const handleSubmit = async () =>{
         setLoading(true)
         setError("")
        try {
           const response = await userService.login({
             username: userName,
             password: password,
           });
           setUser(response);
           setLoading(false)
           try {
             const jsonValue = JSON.stringify(response);
             await AsyncStorage.setItem("user", jsonValue);
           } catch (e) {
             console.log(e);
           }
        } catch (error) {
          setLoading(false);
          setError("wrong username or password")
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
        <Button style={styles.button} onPress={handleSubmit}>
          Sign in
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
          appearance="ghost"
        >
          Don't have an account yet? Sign Up
        </Button>
      </Layout>
    
      <Layout style={{ flexDirection: "row", justifyContent: "center" }}>
        {loading && <Spinner />}
      </Layout>
      <Layout style={{flexDirection:"row", justifyContent:"center"}}>
        <Text status="danger">{error}</Text>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    
  },
});