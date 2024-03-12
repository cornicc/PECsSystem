import { StatusBar } from 'expo-status-bar';
import { useState,useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';

import TutorialItems from './TutorialItems';
import TutorialSlide from '../data/TutorialSlide';
export default function Tutorial({navigation}){

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    //4:03
    return (
        <View style={styles.container}>
          <FlatList data={TutorialSlide} renderItem={({item}) => <TutorialItems item={item}/>}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item)=>item.id}
          onScroll={Animated.event([{nativeEvent: {contentOffset:{x:scrollX}}}],{
            useNativeDriver: false
          })}
          />
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
