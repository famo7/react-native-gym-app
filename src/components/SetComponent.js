import React, {useState, useContext} from 'react'
import { StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Layout, Input, Button, Icon, Text } from "@ui-kitten/components";
import setService from "../services/setService"
import { UserContext } from '../context';

export default function SetComponent({exerciseId, set}) {
   const user = useContext(UserContext);

   const [isPlaying, setIsPlaying] = useState(false)
   const [restTime, setRestTime] = useState(60)
   const [reps, setReps] = useState(() =>{
     return set === undefined ? "":set.reps
   })
   const [weight, setWeight] = useState(() => {
     return set === undefined ? "" : set.weight;
   });
   const [editable, seteditable] = useState(true)

   return (
     <Layout>
       {!isPlaying && (
         <Layout style={styles.inputViewStyle}>
           <Input
             style={styles.inputStyle}
             placeholder="weight"
             keyboardType="numeric"
             value={weight.toString()}
             onChangeText={(val) => setWeight(val)}
             editable={editable}
             disabled={!editable}
           />
           <Input
             style={styles.inputStyle}
             placeholder="reps"
             keyboardType="numeric"
             value={reps.toString()}
             onChangeText={(val) => setReps(val)}
             editable={editable}
             disabled={!editable}
           />
           <Input
             style={styles.inputStyle}
             placeholder="RestTime"
             keyboardType="numeric"
             value={restTime.toString()}
             onChangeText={(val) => setRestTime(val)}
             editable={editable}
             disabled={!editable}
           />
           {editable && (
             <Button
               style={styles.button}
               size="large"
               onPress={() => {
                 setIsPlaying(!isPlaying);
                 setService.setToken(user.token);
                 setService.create({
                   reps: reps,
                   weight: weight,
                   exercise: exerciseId,
                 });
                 seteditable(false);
               }}
               accessoryLeft={<Icon name="play-circle-outline" />}
               appearance="ghost"
             ></Button>
           )}
         </Layout>
       )}
       {isPlaying && (
         <Layout style={styles.inputViewStyle}>
           <CountdownCircleTimer
             isPlaying={isPlaying}
             duration={restTime}
             colors="#FF0000"
             onComplete={() => setIsPlaying(false)}
           >
             {({ remainingTime, color }) => (
               <Text style={{ color, fontSize: 40 }}>{remainingTime}</Text>
             )}
           </CountdownCircleTimer>
         </Layout>
       )}
     </Layout>
   );
}


const styles = StyleSheet.create({
  inputViewStyle: {
    flexDirection: "row",
    
  },
  inputStyle: {
    
    margin: 12,
    // borderBottomWidth: 1,
    // padding: 10,
  },

});
