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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>DECKS || ALL</Text>
        <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
          <Text>: SIDE MENUEEEE</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        horizontal={true}
        data={CardList}
        renderItem={renderItem}
      />

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
    height:'40px',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#5B5F97',
    padding:10,
  },
  card:{
    height:100,
    width:70,
    backgroundColor:'#fff',
  }
});
