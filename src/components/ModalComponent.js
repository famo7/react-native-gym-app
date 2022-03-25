import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Modal, Icon, Input } from "@ui-kitten/components";
import style from "../../styles";
export default function ModalComponent({visible, setVisible, name, setName, createData}) {
  

  return (
    <View style={styles.container}>
      <Button
        size="large"
        onPress={() => {
          setVisible(true)
          
        }}
        
        accessoryLeft={<Icon name="plus-outline" />}
        appearance="ghost"
        style={styles.FAB}
      ></Button>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Input
            placeholder="Workout name..."
            value={name}
            onChangeText={(val) => setName(val)}
          />
          <Button onPress={() =>{
            setVisible(false)
            createData();
          }}>CREATE</Button>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
 
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  FAB: style.FAB,
});
