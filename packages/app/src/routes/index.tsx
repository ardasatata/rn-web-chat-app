import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {DrawerNavigator} from "../components/drawer-component";

const StackNav = createStackNavigator();

const Navigator = () => (
  <NavigationContainer>
    <StackNav.Navigator initialRouteName="Anime List">
      <StackNav.Screen
        options={{headerShown: false}}
        name="Channel Details"
        component={DrawerNavigator}
      />
    </StackNav.Navigator>
  </NavigationContainer>
);

export default Navigator;