import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Information from '../screens/information';

import { ReactComponent as ArrowLeft } from '@rn-web-chat-app/app/src/assets/svgs/arrowLeft.svg';
import {color, spacing} from "@rn-web-chat-app/app/src/styles";
import ChannelDetails from "../screens/channel-details";
import {useContext} from "react";
import {ChatContext} from "@rn-web-chat-app/app/src/hooks/ChatContextProvider";
import {ChannelName} from "@rn-web-chat-app/app/src/type/chat";

const StackNav = createStackNavigator();

const Navigator = () => {

  const {
    activeChannel,
    activeUser
  } = useContext(ChatContext)

  return(
    <NavigationContainer>
      <StackNav.Navigator
        initialRouteName="Chat"
        screenOptions={{
          headerBackImage: () => <ArrowLeft fill={color.dark900} height={spacing[12]} width={spacing[12]}/>,
        }}>
        <StackNav.Screen
          name={`${ChannelName[activeChannel]} as ${activeUser}`}
          component={ChannelDetails}
        />
        {/*<StackNav.Screen*/}
        {/*  name="Detail"*/}
        {/*  component={Information}*/}
        {/*/>*/}
      </StackNav.Navigator>
    </NavigationContainer>
  )
};

export default Navigator;