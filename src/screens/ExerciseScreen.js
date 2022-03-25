import React, {useState, useContext, useEffect} from "react";
import {StyleSheet } from "react-native";

import Exercises from "../components/Exercises";

import { Layout, List, Divider } from "@ui-kitten/components";
import ModalComponent from "../components/ModalComponent";

import { UserContext } from "../context";
import exerciseService from "../services/exerciseService";

export default function ExerciseScreen({ route }) {
  const user = useContext(UserContext);

  const { workoutId } = route.params;
  const [visible, setVisible] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const getExercises = async () =>{
      exerciseService.setToken(user.token);
      const ex = await exerciseService.getAll({workoutId:workoutId});
      setExercises(ex);
    }
    getExercises()
    
  }, [])
  

  return (
    <Layout style={styles.container}>
      <List
        keyExtractor={(item) => item.id}
        data={exercises}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => <Exercises exercise={item} />}
      />
      <ModalComponent
        visible={visible}
        setVisible={setVisible}
        createData={() =>{
          exerciseService.setToken(user.token);
          exerciseService
            .create({
              name: exerciseName,
              workout: workoutId,
            })
            .then((i) => {
              setExercises([...exercises, i]);
            });
        }}
        name={exerciseName}
        setName={setExerciseName}
      />
      
    </Layout>
  );
}

const styles = StyleSheet.create({
  container:{
    height:"100%"
  }
});
