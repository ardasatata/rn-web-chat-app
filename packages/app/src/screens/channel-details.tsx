/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet, TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView, Platform, Image
} from 'react-native';
import {color, layout, roundness, spacing} from "../styles";
import {HStack, VStack} from "../components/view-stack";
import {Text} from "../components/text/text";
import {Spinner} from "../components/spinner";
import {CenterText} from "../components/center-text";
import {Spacer} from "../components/spacer";
import {Button} from "../components/button/button";

import {toReadableDate} from "../utils/date";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import KeyboardStickyView from 'rn-keyboard-sticky-view';
import {ChatContext} from "../hooks/ChatContextProvider";

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
                                      source={{uri: `https://ui-avatars.com/api/?name=${item.userId}&background=0D8ABC&color=fff`}}
                                      style={{ height: spacing['32'], width: spacing['32'], borderRadius: roundness.full}}
                                    />
                                  </HStack>
                                }
                                <Spacer width={spacing.small}/>
                                <VStack horizontal={spacing.small}
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

export default ChannelDetails;
