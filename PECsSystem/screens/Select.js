import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

const dummydata = [
  {
    id: '1',
    title: 'Favorites'
  },
  {
    id: '2',
    title: 'Foods'
  },
  {
    id: '3',
    title: 'Family'
  },
  {
    id: '4',
    title: 'Cars'
  },
  {
    id: '5',
    title: 'Animals'
  },
];

const Item = ({title}) => (
  <TouchableOpacity style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

export default function Select() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbtn}>
          <Text>
            ←
          </Text>
        </TouchableOpacity>
        <Text>
          SELECT
        </Text>
      </View>

      <View style={styles.flatlistcontainer}>
        <FlatList
          data={dummydata}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
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
  flatlistcontainer:{
    marginTop: 25,
    width: '100%',
    height: 'auto',
  },
  item:{
    backgroundColor: 'lightgray',
    height: 50,
    margin: 5,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
});