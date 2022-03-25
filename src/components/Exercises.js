import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import { Layout, Card, Icon, Button, Text} from "@ui-kitten/components";
import SetComponent from "./SetComponent";
export default function Exercises({ exercise }) {
    const [amountOfSets, setAmountOfSets] = useState(3)
    
    let sets = exercise.sets.map((item) => ({ ...item }));
    sets.sort((a, b) => - a.createdAt.localeCompare(b.createdAt))
    sets.reverse()
    
  return (
    <Layout>
      <Text style={{margin:10}} category="h4">
        {exercise.name}
      </Text>
      <Card>
        {/* when 0 => 2, 1 =>  */}
        {Array.from({ length: amountOfSets }, (_, index) => (
          <SetComponent
            key={index}
            exerciseId={exercise.id}
            set={sets[index]}
          />
        ))}

        <Layout
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
          <Button
            size="large"
            onPress={() => {
              if (amountOfSets > 1) {
                setAmountOfSets(amountOfSets - 1);
              }
            }}
            accessoryLeft={<Icon name="minus-outline" />}
            appearance="ghost"
            style={styles.button}
          ></Button>

          <Button
            size="large"
            onPress={() => setAmountOfSets(amountOfSets + 1)}
            accessoryLeft={<Icon name="plus-outline" />}
            appearance="ghost"
            style={styles.button}
          ></Button>
        </Layout>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  
  
});
