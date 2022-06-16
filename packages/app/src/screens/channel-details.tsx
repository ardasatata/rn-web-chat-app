/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList, Image,
  StyleSheet, TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView, Platform
} from 'react-native';
import {logger} from "../utils"
import {color, layout, roundness, spacing} from "../styles";
import {HStack, VStack} from "../components/view-stack";
import {Text} from "../components/text/text";
import {Spinner} from "../components/spinner";
import {CenterText} from "../components/center-text";
import {Spacer} from "../components/spacer";
import {Button} from "../components/button/button";

import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {toReadableDate} from "../utils/date";

import KeyboardStickyView from 'rn-keyboard-sticky-view';
import {ChatContext} from "../hooks/ChatContextProvider";
import {ChannelIdType, ChannelIdTypeEnum, UserType} from "../type/chat";
import {useNavigation, useNavigationContainerRef, useNavigationState} from "@react-navigation/native";

const Drawer = createDrawerNavigator();


function DrawerNavigator({navigation, route}) {

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
        <DrawerItem label="Sam" onPress={()=> selectActiveUser("Sam")}  />
        <DrawerItem label="Russell" onPress={()=> selectActiveUser("Russell")}  />
        <DrawerItem label="Joyse" onPress={()=> selectActiveUser("Joyse")}  />
        <DrawerItem label="General" onPress={()=> selectActiveChannel(ChannelIdTypeEnum.GENERAL)}  />
        <DrawerItem label="Technology" onPress={()=> setActiveChannel(ChannelIdTypeEnum.TECHNOLOGY)}  />
        <DrawerItem label="LGTM" onPress={()=> setActiveChannel(ChannelIdTypeEnum.LGTM)}  />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={`${activeChannel} as ${activeUser}`} component={ChannelDetails} >
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const ChannelDetails = ({navigation}) => {

  const {
    text,
    messages,
    setText,
    error,
    sendMessage,
    loading,
    fetchMoreMessage,
    activeUser,
    setActiveUser,
    fetchInitialData,
    postMessageLoading,
    setActiveChannel,
    resendUnsent,
    unsentMessages,
    activeChannel,
    tailMessageId,
    renderLoading
  } = useContext(ChatContext)

  if (loading || renderLoading) {
    return (
      <Spinner/>
    );
  }

  // if (error) {
  //   return (
  //     <CenterText text={"Something wrong :("}/>
  //   );
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <VStack bottom={spacing["96"]} style={{backgroundColor: color.dark100}}>
        {messages ? (
          messages.length !== 0 ? (
            <FlatList
              style={[layout.heightFull]}
              inverted
              onEndReached={()=> fetchMoreMessage(activeChannel, tailMessageId)}
              contentContainerStyle={{}}
              data={[...unsentMessages, ...messages]}
              // keyExtractor={(item) => String(item.messageId)}
              renderItem={({item}) => {
                if(item.channelId === undefined || item.channelId === activeChannel){
                  return (
                    <TouchableOpacity onPress={()=> {
                      if(item.datetime === ""){
                        resendUnsent(item)
                      }
                    }}>
                      <VStack horizontal={spacing.small} vertical={spacing.small}>
                        <VStack>
                          <HStack>
                            { item.userId === activeUser ? <Spacer/> : null }
                            <VStack>
                              { item.userId === activeUser ? null : <Text type={'label-bold'} style={{color: color.dark900}}>{item.userId}</Text> }
                            </VStack>
                          </HStack>
                          <HStack>
                            { item.userId === activeUser ? <Spacer/> : null }
                            <VStack horizontal={spacing.small}
                                    vertical={spacing.small}
                                    style={{backgroundColor: color.primary300, borderRadius: roundness.lg,
                                      maxWidth: Dimensions.get("window").width * 0.65}}>
                              <VStack style={{flex: 1}} >
                                <Text type={'body'} style={{color: color.dark900}}>{item.text}</Text>
                              </VStack>
                            </VStack>
                          </HStack>
                          <HStack>
                            { item.userId === activeUser ? <Spacer/> : null }
                            <VStack>
                              <Spacer height={spacing.nano} />
                              <Text numberOfLines={1} type={'label'} style={{color: color.dark900}}>
                                {item.datetime !== '' ? toReadableDate(item.datetime) : ""}
                              </Text>
                            </VStack>
                          </HStack>
                        </VStack>
                      </VStack>
                    </TouchableOpacity>
                  )
                } else {
                  return null
                }
              }}
              ListFooterComponent={() => (
                <>
                  {loading ? <Spinner/> : null}
                </>
              )}
              // ListFooterComponent={
              //
              // }
              // ListHeaderComponent={()=> (
              //   <HStack horizontal={spacing.medium} bottom={spacing.small}>
              //     <AscDescSort isDesc={isSortDesc} onTogglePress={setIsSortDesc} />
              //   </HStack>
              // )}
            />
          ) : (
            <CenterText text={"No Data Found :("}/>
          )
        ) : (
          <View style={styles.loadContainer}>
            <Spinner/>
          </View>
        )}
      </VStack>
      <KeyboardStickyView>
        <HStack style={{backgroundColor: color.offWhite, borderRadius: roundness.medium}} horizontal={spacing.large} bottom={spacing.large} vertical={spacing.medium}>
          <HStack style={{backgroundColor: color.offWhite, borderRadius: spacing.large, minHeight: spacing.extraLarge3}} >
            <TextInput
              multiline
              value={text}
              onChangeText={(value => setText(value))} placeholder={"type message here"}
              style={{fontSize: spacing[16], flex: 1, backgroundColor: color.offWhite, height: '100%'}}/>
            <Button type={"send"} text={"Send"} onPress={() => {
              sendMessage()
            }}/>
          </HStack>
        </HStack>
      </KeyboardStickyView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadContainer: {
    flex: 1,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DrawerNavigator;
