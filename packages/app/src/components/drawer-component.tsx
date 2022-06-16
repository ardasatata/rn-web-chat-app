import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import React, {useContext} from "react";
import {ChatContext} from "../hooks/ChatContextProvider";
import {ChannelIdType, ChannelIdTypeEnum, ChannelName, UserType} from "../type/chat";
import ChannelDetails from "../screens/channel-details";
import {CenterText} from "./center-text";
import {Spacer} from "./spacer";
import {spacing} from "../styles";

const Drawer = createDrawerNavigator();

export function DrawerNavigator({navigation, route}) {

  const {
    activeChannel,
    activeUser
  } = useContext(ChatContext)

  function CustomDrawerContent(props) {

    const {
      setActiveUser,
      setActiveChannel
    } = useContext(ChatContext)

    const selectActiveUser = (userId: UserType) => {
      setActiveUser(userId)
      props.navigation.closeDrawer()
    }

    const selectActiveChannel = (channelId: ChannelIdType) => {
      setActiveChannel(channelId)
      props.navigation.closeDrawer()
    }

    return (
      <DrawerContentScrollView {...props}>
        <CenterText text={"User"}/>
        <Spacer height={spacing.medium} />
        <DrawerItem label="Sam" onPress={()=> selectActiveUser("Sam")}  />
        <DrawerItem label="Russell" onPress={()=> selectActiveUser("Russell")}  />
        <DrawerItem label="Joyse" onPress={()=> selectActiveUser("Joyse")}  />
        <CenterText text={"Channel"}/>
        <Spacer height={spacing.medium} />
        <DrawerItem label="General" onPress={()=> selectActiveChannel(ChannelIdTypeEnum.GENERAL)}  />
        <DrawerItem label="Technology" onPress={()=> setActiveChannel(ChannelIdTypeEnum.TECHNOLOGY)}  />
        <DrawerItem label="LGTM" onPress={()=> setActiveChannel(ChannelIdTypeEnum.LGTM)}  />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={`${ChannelName[activeChannel]} as ${activeUser}`} component={ChannelDetails} >
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}