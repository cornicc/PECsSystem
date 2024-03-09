import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';

export default function Splash({navigation}){
    return (
        <View style={styles.container}>
          <Text>Splash Text</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("Drawer")}}>
            <Text>Get Started</Text>
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
  });