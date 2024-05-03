import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardList } from '../data/CardData';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AddCard({navigation}) {
  const [text, setText] = useState('');

  const saveCard=async()=>{
    try {
      myDeck=CardList[0].content
      if(myDeck==null){
        newCard={
          name:text
        }
        myDeck=[newCard]
      }
      else{
        newCard={
          name:text
        }
        myDeck.unshift(newCard)
      }

      await AsyncStorage.setItem('myDeckContent',JSON.stringify(myDeck))

    } catch (e) {
      alert(e);
    } 
  }

  const addVoice=()=>{
    navigation.navigate('AddVoice')
  }
  
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
        <TouchableOpacity style={styles.addbtns} onPress={()=>{addVoice()}}>
          <Text>
            ADD VOICE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addbtns}>
          <Text>
            ADD SECOND IMAGE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addbtns}  onPress={()=>{saveCard()}}>
          <Text>
            SAVE
          </Text>
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
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});