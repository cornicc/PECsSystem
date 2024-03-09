import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export default function EditDeck({navigation}){
    return (
        <View style={styles.container}>
          <Text>Edit Deck</Text>
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