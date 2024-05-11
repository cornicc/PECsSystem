import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import * as Progress from 'react-native-progress';
import {  StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, TextInput} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function AddVoice() {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(1.0);
  const [timer, setTimer] = useState(null);
  const [isRecording, setIsRecording] =useState(false)
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    setIsReadyToPlay(false);
    setProgress(1.0);
    const newTimer = setInterval(() => {
        setProgress((prevProgress) => {
            if (prevProgress <= 0.0) {
            clearInterval(newTimer);
            return 1.0;

            }
            return prevProgress - 0.00238;
        });
    }, 16.67);
    setTimer(newTimer);
  };

  // Function to handle the "Record" button press
  const stopRecording = () => {
    if (timer) {
        clearInterval(timer);
        setTimer(null);
        setIsRecording(false);
        setIsReadyToPlay(true);
        setProgress(1); // Clear the progress
    }
  };

  const startPlaying = () => {
    setIsReadyToPlay(false);
    // Add your logic to start playing the recording
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbtn}>
          <Text>
            ←
          </Text>
        </TouchableOpacity>
        <Text>
          EDIT
        </Text>
      </View>
      
      <View>
        <View style={styles.cardcontainer}>
          <TouchableOpacity style={styles.addimagebtn}>
            <Text>
              +
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="INSERT TEXT"
          />
        </View>

        <View style={styles.btncontainer}>
        {/* Progress bar */}
        {isRecording && (
            <Progress.Bar
            progress={progress}
            height={20}
            width={windowWidth * 0.70}
            marginBottom={20}
            borderRadius={20}
            />
        )}
        {/* Record button */}
        <TouchableOpacity style={styles.addbtns} onPress={isReadyToPlay ? startPlaying : isRecording ? stopRecording : startRecording}>
            <Text>{isReadyToPlay ? 'Play' : isRecording ? 'Stop' : 'Record'}</Text>
        </TouchableOpacity>
        </View>


      </View>  
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: '95%',
    justifyContent: 'center'
  },
  backbtn: {
    backgroundColor: 'lightgray',
    position: 'absolute',
    left: 0,
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardcontainer:{
    backgroundColor: 'lightgray',
    height: windowHeight * .45,
    width: windowWidth *0.70,
    marginTop: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  addimagebtn:{
    backgroundColor: 'lightblue',
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  input: {
    height: '20%',
    width: 200,
    marginTop: 25,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'grey',
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  btncontainer:{
    marginTop: 30,
    width: windowWidth *0.70,
    alignItems: 'center',
  },
  addbtns:{
    backgroundColor: 'lightblue',
    marginBottom: 10,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});