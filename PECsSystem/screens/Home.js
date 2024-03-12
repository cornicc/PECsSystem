import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , FlatList, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { CardList } from '../data/CardData';

export default function Home({navigation}) {
  const renderItem =({item})=>(
    <View style={styles.card}>
      <Text>{item.name}</Text>
      <Text>{item.category}</Text>
    </View>
  );
//style={styles.selectedcards}//
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>DECKS || ALL</Text>
        <TouchableOpacity onPress={()=>{navigation.openDrawer()}} style={styles.menu}>
          <Text>Menu</Text>
        </TouchableOpacity>
        


      <View style={{flexDirection:'row', marginTop: 50,}}> 
          <View style={styles.selectcontainer} />
          <View style={styles.selectcontainer} />
          <View style={styles.selectcontainer} />
      </View>

      <View style={{width: '90%', flexDirection: 'row', justifyContent: 'center', marginTop:15}}>
        <TouchableOpacity style={styles.trashbtn}>
          <Text>T</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playbtn}>
          <Text>Play</Text>
        </TouchableOpacity>
      </View>

      </View>
      


      <View style={styles.optioncontainer}>
        <FlatList
          horizontal={true}
          data={CardList}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.maincontent}>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header:{
    width: '100%',
    height: '40%',
    marginTop: '7%',
    backgroundColor: 'gray',
    alignItems: 'center'
  },
  optioncontainer:{
    backgroundColor: 'red'
  },
  selectcontainer:{
    borderWidth: 1,
    width:100,
    height:125,
    margin: 5,
    borderRadius: 12,
    backgroundColor: 'white'
  },
  card:{
    height:120,
    width:100,
    margin: 5,
    backgroundColor:'#fff',
    borderWidth: 1,
    borderRadius: 12,
  },
  menu: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'lightgray',
    position: 'absolute',
    right: 10,
    alignSelf: 'flex-start'
  },
  trashbtn:{
   justifyContent: 'center',
   alignItems: 'center',
   width: 60,
   height: 60,
   backgroundColor: 'lightgray'
  },
  playbtn: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 60,
  }
});
