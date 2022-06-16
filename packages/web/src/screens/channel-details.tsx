/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet, TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {color, layout, roundness, spacing} from "@rn-web-chat-app/app/src/styles";
import {HStack, VStack} from "@rn-web-chat-app/app/src/components/view-stack";
import {Text} from "@rn-web-chat-app/app/src/components/text/text";
import {Spinner} from "@rn-web-chat-app/app/src/components/spinner";
import {CenterText} from "@rn-web-chat-app/app/src/components/center-text";
import {Spacer} from "@rn-web-chat-app/app/src/components/spacer";
import {Button} from "@rn-web-chat-app/app/src/components/button/button";

import {toReadableDate} from "@rn-web-chat-app/app/src/utils/date";

import {ChatContext} from "@rn-web-chat-app/app/src/hooks/ChatContextProvider";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ColorHash from 'color-hash'
import {ChannelIdType, ChannelName, UserType} from "@rn-web-chat-app/app/src/type/chat";

const colorHash = new ColorHash();

const DesktopMenu = () => {

  const userList:Array<UserType> = [
    "Sam",
    "Joyse",
    "Russell"
  ]

  const channelList:Array<ChannelIdType> = [
    "1",
    "2",
    "3"
  ]

  const {
    setActiveUser,
    setActiveChannel
  } = useContext(ChatContext)

  const UserItem = ({userId}:{userId: UserType}) => {
    return(
      <VStack vertical={spacing.tiny} style={{}}>
        <TouchableOpacity
          onPress={()=> setActiveUser(userId)}
          style={{flexDirection: 'row', flex: 1, display: 'flex', alignItems: 'center'}}>
          <Image
            source={{uri: `https://ui-avatars.com/api/?name=${userId}&background=${colorHash.hex(userId).substring(1)}&color=fff`}}
            style={{ height: spacing['20'], width: spacing['20'], borderRadius: roundness.full}}
          />
          <Spacer width={spacing.tiny}/>
          <Text type={'label-bold'} style={{color: color.dark800, fontSize: spacing.medium}}>{userId}</Text>
        </TouchableOpacity>
      </VStack>
    )
  }

  const ChannelItem = ({channelId}:{channelId: ChannelIdType}) => {
    return(
      <VStack vertical={spacing.tiny}>
        <TouchableOpacity
          onPress={()=> setActiveChannel(channelId)}
          style={{flexDirection: 'row', flex: 1, display: 'flex', alignItems: 'center'}}>
          <Image
            source={{uri: `https://ui-avatars.com/api/?name=${channelId}&background=${colorHash.hex(channelId).substring(1)}&color=fff`}}
            style={{ height: spacing['20'], width: spacing['20']}}
          />
          <Spacer width={spacing.tiny}/>
          <Text type={'label-bold'} style={{color: color.dark800, fontSize: spacing.medium}}>{ChannelName[channelId]}</Text>
        </TouchableOpacity>
      </VStack>
    )
  }

  return(
    <VStack vertical={spacing.medium} horizontal={spacing.medium} style={{position: 'absolute', backgroundColor: 'rgba(1,1,1,0.1)', zIndex: 100 }}>
      <Text type={'label'} style={{color: color.dark900, fontSize: spacing.extraMedium}}>{"User List"}</Text>
      <VStack>
        { userList.map((item)=> {
          return(
            <UserItem key={item} userId={item} />
          )
        }) }
        { channelList.map((item)=> {
          return(
            <ChannelItem key={item} channelId={item} />
          )
        }) }
      </VStack>
    </VStack>
  )
}

const ChannelDetails = ({}) => {
  const {
    text,
    messages,
    setText,
    sendMessage,
    loading,
    fetchMoreMessage,
    activeUser,
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

  return (
    <VStack
      style={{flex: 1}}
    >
      <DesktopMenu />
      <View style={styles.container}>
        {messages ? (
          messages.length !== 0 ? (
            <FlatList
              inverted
              onEndReached={()=> fetchMoreMessage(activeChannel, tailMessageId)}
              contentContainerStyle={{}}
              data={[...unsentMessages, ...messages]}
              keyExtractor={(item) => String(item.messageId)}
              renderItem={({item}) => {
                if(item.channelId === undefined || item.channelId === activeChannel){
                  return (
                    <TouchableOpacity onPress={()=> {
                      if(item.datetime === ""){
                        resendUnsent(item)
                      }
                    }}>
                      <VStack horizontal={spacing.small} vertical={spacing.small}>
                        <HStack style={[layout.widthFull]}>
                          <VStack style={[layout.widthFull, {flex: 4}]}>
                            <VStack>
                              <HStack>
                                { item.userId === activeUser ? <Spacer/> : null }
                                <VStack bottom={spacing.tiny}>
                                  { item.userId === activeUser ? null : <Text type={'label-bold'} style={{color: color.dark900}}>{item.userId}</Text> }
                                </VStack>
                              </HStack>
                              <HStack>
                                { item.userId === activeUser ? <Spacer/> : null }
                                { item.userId === activeUser ? null :
                                  <HStack style={{width: spacing['32']}}>
                                    <Image
                                      source={{uri: `https://ui-avatars.com/api/?name=${item.userId}&background=${colorHash.hex(item.userId).substring(1)}&color=fff`}}
                                      style={{ height: spacing['32'], width: spacing['32'], borderRadius: roundness.full}}
                                    />
                                  </HStack>
                                }
                                <Spacer width={spacing.small}/>
                                <VStack
                                  horizontal={spacing.small}
                                  vertical={spacing.small}
                                  style={{
                                    backgroundColor: item.datetime !== '' ? color.primary300 : color.secondary500,
                                    borderRadius: roundness.lg,
                                    maxWidth: Dimensions.get("window").width * 0.65
                                  }}>
                                  <VStack style={{flex: 1}} >
                                    <Text type={'body'} style={{color: color.dark900}}>{item.text}</Text>
                                  </VStack>
                                </VStack>
                              </HStack>
                              <HStack top={spacing.tiny}>
                                <Spacer/>
                                { item.datetime !== "" ? null : <Text type={'label-bold'} style={{color: color.dark900}}>{"Unsent"}</Text> }
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
                        </HStack>
                      </VStack>
                    </TouchableOpacity>
                  )
                } else {
                  return null
                }
              }}
              ListHeaderComponent={<View style={{height: 200}}/>}
            />
          ) : (
            <CenterText text={"No Data Found :("}/>
          )
        ) : (
          <View style={styles.loadContainer}>
            <Spinner/>
          </View>
        )}
      </View>
      <VStack style={{position: "absolute", bottom: 0}}>
        <HStack style={styles.bottomContainer} horizontal={spacing.large} bottom={spacing.large} vertical={spacing.medium}>
          <HStack style={styles.bottomInputContainer} >
            <TextInput
              multiline
              value={text}
              onChangeText={(value => setText(value))} placeholder={"Type your message here..."}
              style={styles.bottomInputStyle}/>
            <Button disabled={text===""} type={text === "" ? "send-disabled" : "send"} text={"Send"} onPress={() => {
              sendMessage()
            }}/>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {backgroundColor: 'rgba(1,1,1,0.1)', borderRadius: roundness.medium},
  bottomInputContainer: {borderRadius: spacing.large, minHeight: spacing.extraLarge3},
  bottomInputStyle: {fontSize: spacing[12], flex: 1, minHeight: 120, height: '100%'},
  container: {
    flex: 1,
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: color.white,
    maxHeight: '94vh',
    width: 720
  },
  loadContainer: {
    flex: 1,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChannelDetails;
