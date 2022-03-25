import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Workout from "../components/Workout";
import workoutService from "../services/workoutService";
import { Layout, List, Divider } from "@ui-kitten/components";
import ModalComponent from "../components/ModalComponent";

export default function HomeScreen({ setUser, user, navigation }) {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const getWorkouts = async () => {
      workoutService.setToken(user.token);
      const response = await workoutService.getAll();

      setWorkouts(response.workouts);
    };
    getWorkouts();
  }, []);

  const createWorkout = async () => {
    workoutService.setToken(user.token);
    const workout = await workoutService.create({
      name: workoutName,
    });
    setWorkouts([...workouts, workout]);
  };

  return (
    <Layout style={styles.container}>
      <Layout style={{ alignItems: "center" }}></Layout>
      <List
        keyExtractor={(item) => item.id}
        data={workouts}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <Workout workout={item} navigation={navigation} />
        )}
      />

      <ModalComponent
        visible={visible}
        setVisible={setVisible}
        createData={createWorkout}
        name={workoutName}
        setName={setWorkoutName}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
 
});
