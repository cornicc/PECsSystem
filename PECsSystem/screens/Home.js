import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , FlatList, TouchableWithoutFeedback, TouchableOpacity, Modal, SafeAreaView, Button, TextInput, Image} from 'react-native';
import { CardList } from '../data/CardData';
import { useState,useEffect } from 'react';
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home({navigation}) {
  const [selectedDeck,setDeck]=useState(CardList[1].content)
  const [playDeck,setPlayDeck]=useState([])
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  
 
  const renderItem =({item})=>(
    <TouchableOpacity style={[styles.card, styles.shading]} onLongPress={()=>{alert('ffff')}} onPress={()=>{addToPlayDeck(item)}}>
      <Image source={item.image} style={styles.cardPicture}></Image>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  const renderCategory =({item})=>(
    <TouchableOpacity style={styles.categorybtn} onPress={()=>{setDeck(item.content)}}>
      <Text style={{color:'white'}}>{item.name}</Text>
    </TouchableOpacity>
  );
  const renderSelected=({item})=>(
    <View style={[styles.selectcontainer, styles.shading]}>
      <Image source={item.image} style={styles.cardPicture}></Image>
      <Text>{item.name}</Text>
    </View>
  )

  const addToPlayDeck=(item)=>{
    setPlayDeck([...playDeck,item])
  }
  const clearPlayDeck=()=>{
    setPlayDeck([])
  }
  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const loadAudio=async()=>{
    for(let x=0;x<playDeck.length;x++){
      try{
         const { sound } = await Audio.Sound.createAsync(playDeck[x].audio);
      const newAudio={
        sound:sound
      }
      await sound.playAsync()
      sound.setOnPlaybackStatusUpdate((status)=>{
        if (status.didJustFinish){
          sound.unloadAsync()
        }
      })
      await sleep(1000)
      }
      catch(e){
        alert("Missing an audio for this card")
      }
    }
  }

  const getContentData=async()=>{
    try {
      const value = await AsyncStorage.getItem('myDeckContent');
      const truevalue = JSON.parse(value)

      CardList[0].content=truevalue
    } catch (e) {
      alert(e)
    }
  }

  useEffect(()=>{
    getContentData();
  },[])
  
//style={styles.selectedcards}//
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: '#FFC145', fontSize: 20}}>DECKS | ALL</Text>
        <TouchableOpacity onPress={()=>{navigation.openDrawer()}} style={styles.menu}>
          <Ionicons name="menu" size={32} color="#FFC145"/>
        </TouchableOpacity>

        <View style={{flexDirection:'row', marginTop: 50, marginLeft: 28}}>
            <FlatList
              bounces={false}
              horizontal={true}
              data={playDeck}
              renderItem={renderSelected}
            />
        </View>

        <View style={{width: '90%', flexDirection: 'row', justifyContent: 'center', marginTop:15}}>
          <TouchableOpacity style={[styles.trashbtn, styles.shading]} onPress={()=>{clearPlayDeck()}}>
            <Ionicons name="trash" size={20} color='#FFC145'/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.playbtn, styles.shading]} onPress={()=>{loadAudio()}}>
            <Ionicons name="play" size={20} color='#FFC145'/>
          </TouchableOpacity>
        </View>
      </View>
      

        <View style={styles.optioncontainer}>
          <View style={styles.categorycontainer}>
              <FlatList
                bounces={false}
                horizontal={true}
                data={CardList}
                renderItem={renderCategory}
                style={styles.categoryBTNcontainer}
              />
              <TouchableOpacity style={styles.searchbtn} onPress={() => setSearchInputVisible(!searchInputVisible)}>
                <Ionicons name='search' size={30} color='#FFC145'/>
              </TouchableOpacity>
              {searchInputVisible &&(
                <>
                <TextInput placeholder="Search" style={styles.searchinput}/>
                <View style={styles.searchcancelbtnbackground} >
                  <TouchableOpacity style={styles.searchcancelbtn} onPress={()=>setSearchInputVisible(false)}>
                    <Ionicons name="close" size={30} color='#FFC145'/>
                  </TouchableOpacity>
                </View>
                </>
              )}
          </View>
          <FlatList
            bounces={false}
            horizontal={false}
            data={selectedDeck}
            renderItem={renderItem}
            numColumns={3}
          />
        </View>
       
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B5F97',
    alignItems: 'center',

  },
  header:{
    width: '100%',
    height: '40%',
    marginTop: 50,
    backgroundColor: '#5B5F97',
    alignItems: 'center'
  },
  optioncontainer:{
    backgroundColor: 'white',
    width: '100%',
    height: '60%',
    alignItems: 'center',
    paddingBottom: 60,
    borderRadius: 16,
  },
  selectcontainer:{
    width:100,
    height:125,
    margin: 5,
    borderRadius: 12,
    padding:7,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  card:{
    alignItems: 'center',
    justifyContent: 'flex-end',
    height:130,
    width:100,
    margin: 5,
    backgroundColor:'#fff',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#B8B8D1',
    padding: 5,
  },
  menu: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 30,
    position: 'absolute',
    right: 5,
    alignSelf: 'flex-start'
  },

  trashbtn:{
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#5B5F97',
   width: 60,
   height: 60,
   borderRadius: 30,
   marginEnd: 10,
   borderColor: '#FFC145',
   borderWidth: 3,
   
  },
  playbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5B5F97',
    width: 200,
    height: 60,
    color: '#FFC145',
    borderColor: '#FFC145',
    borderWidth: 3,
    borderRadius: 90,
    color:'#FFC145',
  },
  categorycontainer:{
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B8B8D1',
  },
  categorybtn:{
    height: 50,
    width: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    backgroundColor: '#FF6B6C',
    alignSelf: 'center',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryBTNcontainer:{
    backgroundColor: 'white',
    width: '81.5%',
    left: 0,
    position: 'absolute',
    height: '100%',
  },
  searchbtn:{
    backgroundColor: '#5B5F97',
    width: '18%',
    right:0,
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    justifyContent:'center'
  },
  searchinput: {
    height: '100%',
    width: '80%',
    left: 0,
    position: 'absolute',
    backgroundColor: 'white',
    paddingLeft: 15,
  },
  searchcancelbtnbackground:{
    right:0,
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'

  },
  searchcancelbtn:{
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#FF6B6C',
    alignItems: 'center',
    justifyContent: 'center'
  },

  shading:{
    shadowColor: '#000000',
    shadowOffset: {width: 100, height: 125},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5
  },

  cardPicture:{
    height:'70%',
    width:'85%'
  }
});
