import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';

export default function Splash({navigation}){
    return (
        <View style={styles.container}>
          <View style={styles.logo_container}>
            <Text style={styles.t1}>LOGO</Text>
          </View>
          <Text style={styles.t2}>
            WELCOME
          </Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("Drawer")}} style={styles.btn}>
            <Text style={styles.t3}>GET STARTED</Text>
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
