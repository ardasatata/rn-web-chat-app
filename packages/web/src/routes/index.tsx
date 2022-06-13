import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnimeList from '../screens/anime-list';
import Information from "../screens/information";
// import Information from '../screens/information';

import { ReactComponent as ArrowLeft } from '@rn-web-chat-app/app/src/assets/svgs/arrowLeft.svg';
import {color, spacing} from "@rn-web-chat-app/app/src/styles";

const StackNav = createStackNavigator();

const Navigator = () => (
  <NavigationContainer>
    <StackNav.Navigator
      initialRouteName="Anime List"
      screenOptions={{
        headerBackImage: () => <ArrowLeft fill={color.dark900} height={spacing[12]} width={spacing[12]} />,
      }}>
      <StackNav.Screen
        name="Anime List"
        component={AnimeList}
      />
      <StackNav.Screen
        name="Detail"
        component={Information}
      />
    </StackNav.Navigator>
  </NavigationContainer>
);

export default Navigator;