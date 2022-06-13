import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnimeList from '../screens/anime-list';
import Information from '../screens/information';
import ChannelDetails from "../screens/channel-details";

const StackNav = createStackNavigator();

const Navigator = () => (
  <NavigationContainer>
    <StackNav.Navigator initialRouteName="Anime List">
      <StackNav.Screen
        //   options={{headerShown: false}}
        name="Channel Details"
        component={ChannelDetails}
      />
      {/*<StackNav.Screen*/}
      {/*  //   options={{headerShown: false}}*/}
      {/*  name="Anime List"*/}
      {/*  component={AnimeList}*/}
      {/*/>*/}
      <StackNav.Screen
        options={{headerShown: false}}
        name="Detail"
        component={Information}
      />
    </StackNav.Navigator>
  </NavigationContainer>
);

export default Navigator;