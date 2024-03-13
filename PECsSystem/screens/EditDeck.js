import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { CardList } from '../data/CardData';

export default function EditDeck({navigation}){

  const renderItem =({item})=>(
    <View style={styles.card}>
      <Text>{item.name}</Text>
      <Text>{item.category}</Text>
    </View>
  );

    return (
        <View style={styles.container}>

        
          <View style={styles.header}>
            <TouchableOpacity style={styles.backbtn}>
              <Text>
                ←
              </Text>
            </TouchableOpacity>
            <Text>
              EDIT DECK
            </Text>
          </View>

          <View style={styles.container2}>
            <View style={{flexDirection:'row', marginTop: 20,}}> 
              <View style={styles.selectcontainer} />
              <View style={styles.selectcontainer} />
              <View style={styles.selectcontainer} />
              <View style={styles.selectcontainer} />
            </View>
            <View style={{flexDirection:'row', marginTop: 5,}}> 
              <View style={styles.selectcontainer} />
              <View style={styles.selectcontainer} />
              <View style={styles.selectcontainer} />
              <View style={styles.selectcontainer} />
            </View>

            <View style={styles.editcontainer}>
              <TouchableOpacity style={styles.chooseiconbtn}>
                <Text>ICON</Text>
              </TouchableOpacity>
              <Text>SET DECK NAME</Text>
            </View>
          </View>
          
          <View style={styles.optioncontainer}>
            <FlatList
              bounces={false}
              horizontal={false}
              data={CardList}
              renderItem={renderItem}
              numColumns={3}
            />
          </View>

          <View>

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
    container2:{
      width: '95%',
      alignItems: 'center',
      backgroundColor: 'gray'
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
    selectcontainer:{
      borderWidth: 1,
      width:75,
      height:100,
      margin: 5,
      borderRadius: 12,
      backgroundColor: 'white'
    },
    editcontainer:{
      margin: 10,
      width: 200,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'

    },
    chooseiconbtn:{
      backgroundColor: 'lightgray',
      width: 50,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginEnd: 15,
    },
    optioncontainer:{
      backgroundColor: 'white',
      width: '100%',
      height: '60%',
      alignItems: 'center',
      borderRadius: 16,
    },
    card:{
      alignItems: 'center',
      justifyContent: 'flex-end',
      height:125,
      width:100,
      margin: 5,
      backgroundColor:'#fff',
      borderWidth: 1,
      borderRadius: 12,
      padding: 5,
    },
  });