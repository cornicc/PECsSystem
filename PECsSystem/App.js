import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';


import Home from './screens/Home'
import Splash from './screens/Splash'
import Select from './screens/Select';
import EditDeck from './screens/EditDeck';
import EditCard from './screens/EditCard';

const Stack=createStackNavigator();
const Drawer=createDrawerNavigator();

const DrawerNav=()=>{
  return(
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Drawer.Screen name="Select" component={Select}/>
        <Drawer.Screen name="EditDeck" component={EditDeck}/>
        <Drawer.Screen name="EditCard" component={EditCard}/>
      </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name="Drawer" component={DrawerNav}/>
    </Stack.Navigator>
    </NavigationContainer>
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
