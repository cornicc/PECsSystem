import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardList } from '../data/CardData';

export default function Splash({navigation}){
    const [skip,setskip]=useState();

    const storeData = async(value) => {
      try {
        await AsyncStorage.setItem('skipTutorial',JSON.stringify(value))
        if(skip==true){
          navigation.navigate('Drawer',{screen:'Home'})
        }
        else{
          navigation.navigate('Drawer')
        }
      } catch (e) {
        alert(e);
      }
    }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('skipTutorial');
        const truevalue = JSON.parse(value)
        if (value !== null) {
          alert("Current skip data is "+truevalue);
          setskip(truevalue)
        }
      } catch (e) {
        alert(e)
      }
    };

    useEffect(()=>{
      getData();
    },[])
    
    return (
        <View style={styles.container}>
          <View style={styles.logo_container}>
            <Text style={styles.t1}>LOGO</Text>
          </View>
          <Text style={styles.t2}>
            WELCOME
          </Text>
          <TouchableOpacity onPress={()=>{storeData(true)}} style={styles.btn}>
            <Text style={styles.t3}>Get Started</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo_container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'grey',
      height: 200,
      width: 200,
      borderWidth: 1,
      borderRadius: 100,
    },
    t2:{
      fontSize: 50,
      margin:20,
      fontWeight: 'bold',
    },
    t3:{
      fontWeight: 'bold',
    },
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightgrey',
      height: '7%',
      width: '55%',
      borderRadius: 50,
    }

  });
