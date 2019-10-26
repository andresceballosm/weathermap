import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import HomeTransitions from './HomeTransitions'
import History from '../pages/History';
import Detail from '../pages/Detail';
import HistoryTransitions from './HistoryTransitions';


export const StackHome = createStackNavigator({
    home: {
      screen: HomeTransitions,
      navigationOptions: {
        header: null
      }
    }
},{
  headerMode:'none'
});

export const StackHistory = createStackNavigator({
    home: {
      screen: HistoryTransitions,
      navigationOptions: {
        header: null
      }
    }
},{
  headerMode:'none'
});

  
export const TabBar = createBottomTabNavigator(
  {
    Home: {
      screen: StackHome,
      navigationOptions: {
        tabBarIcon: ({focused}) =>
          <Image 
          style= { styles.icon }
          source={ focused ? require('../../assets/rainy-black.png') : require('../../assets/rainy-white.png')}/>
      },
    },
    History: {
      screen: StackHistory,
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          <Image 
          style= { styles.icon }
          source={ focused ? require('../../assets/history-black.png') : require('../../assets/history-white.png')}/>
      }
    },
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
      showLabel: false,
    }
  },
);


const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30
  },
});