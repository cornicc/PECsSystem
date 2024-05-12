import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import * as Progress from 'react-native-progress';
import {  StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, TextInput} from 'react-native';
import { changeAddVoiceUrl,fromAddVoiceUrl } from '../data/miscellaneous';
import { Audio } from 'expo-av';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function AddVoice({navigation}) {
  const [progress, setProgress] = useState(1.0);
  const [timer, setTimer] = useState(null);
  const [isRecording, setIsRecording] =useState(false)
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recording, setRecording] = useState();
  const [recordedItem, setRecordedItem] = useState([]);
  const [doneRecording,setDoneRecording]= useState(false);

  const getDurationFormatted=(millis)=>  {
    const minutes = millis / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return `${Math.floor(minutes)}:${seconds < 10 ? '0' : ''}${seconds}` 
  }

  const startRecording = async() => {
    changeAddVoiceUrl(null);
    setRecordingDuration(0)
    setIsRecording(true);
    setIsReadyToPlay(false);
    setProgress(1.0);
    const newTimer = setInterval(() => {
        setProgress((prevProgress) => {
            if (prevProgress <= 0.0) {
              stopRecording()
              clearInterval(newTimer);
              return 1.0;
            }
            return prevProgress - 0.00238;
        });
    }, 16.67);
    setTimer(newTimer);
    try {
      // Checks if permission to use microphone is allowed
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === 'granted') {
        // Set audio mode and create recording
        await Audio.setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording); // Start recording
      } else {
        setRecording(undefined);
        console.log('Permission is denied, please allow permission');
      }
    } catch (err) {
      setRecording(undefined);
      console.error('Failed to start recording:', err);
    }
  };

  // Function to handle the "Record" button press
  const stopRecording = async() => {
        clearInterval(timer);
        setTimer(null);
        setIsRecording(false);
        setIsReadyToPlay(true);
        setProgress(1); // Clear the progress
        try {
          setRecording(undefined); // Stop recording
          await recording.stopAndUnloadAsync();
          // Create new recording object with sound, duration, and file URI
          const { sound, status } = await recording.createNewLoadedSoundAsync();
          changeAddVoiceUrl(recording.getURI())
          const newRecording = {
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
          };
          // Add new recording to recordings list and reset recording duration
          setRecordedItem(newRecording)
          setRecordingDuration(0);
          setDoneRecording(true)
        } catch (err) {
          setRecording(undefined);
          console.error('Failed to stop recording:', err);
        }
  };

  const startPlaying = async() => {
    setIsReadyToPlay(false);
    await recordedItem.sound.replayAsync()
  };

  const saveVoice=()=>{
    navigation.navigate("AddCard");
    setDoneRecording(false)
  }

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        // Update recording duration state
        setRecordingDuration(prevDuration => {
          const newDuration = prevDuration + 1;
          // Stop recording if max length of the recording is reached, the current max length is 10
          return newDuration;
        });
      }, 1000);
    } else {
      clearInterval(timer); // Clear the timer if recording stops
    }
    return () => clearInterval(timer);
  }, [isRecording]);

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
        {doneRecording?(
          <TouchableOpacity style={styles.addbtns} onPress={()=>{saveVoice()}}>
            <Text>{'Save'}</Text>
        </TouchableOpacity>
        ):null}
        
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