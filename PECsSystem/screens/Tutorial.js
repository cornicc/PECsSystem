import { StatusBar } from 'expo-status-bar';
import { useState,useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Animated, TouchableOpacity } from 'react-native';

import TutorialItems from './TutorialItems';
import TutorialSlide from '../data/TutorialSlide';

export default function Tutorial({navigation}){
    const [end,setEnd]=useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    //4:03

    const flEnd=()=>{
      setEnd(true);
    }
    return (
        <View style={styles.container}>
          <FlatList data={TutorialSlide} renderItem={({item}) => <TutorialItems item={item}/> }
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item)=>item.id}
          onEndReachedThreshold={0.5}
          onEndReached={()=>{flEnd()}}
          onScroll={Animated.event([{nativeEvent: {contentOffset:{x:scrollX}}}],{
            useNativeDriver: false
          })}
          />
          {end?(
            <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
              <Text>I Got It!</Text>
            </TouchableOpacity>
          ):null}
          
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
