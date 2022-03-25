import React from "react";
import { Card, Layout, Text } from "@ui-kitten/components";

export default function Workout({ workout, navigation }) {
  return (
    <Layout>
      <Card
        onPress={() =>
          navigation.navigate("Exercises", {
            workoutId: workout.id,
          })
        }
      >
        <Text>{workout.name}</Text>
      </Card>
    </Layout>
  );
}
