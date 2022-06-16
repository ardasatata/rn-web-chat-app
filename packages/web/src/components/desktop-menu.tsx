import {ChannelIdType, ChannelName, UserType} from "@rn-web-chat-app/app/src/type/chat";
import React, {useContext} from "react";
import {ChatContext} from "@rn-web-chat-app/app/src/hooks/ChatContextProvider";
import {VStack} from "@rn-web-chat-app/app/src/components/view-stack";
import {color, roundness, spacing} from "@rn-web-chat-app/app/src/styles";
import {Image, TouchableOpacity} from "react-native";
import {Spacer} from "@rn-web-chat-app/app/src/components/spacer";
import {Text} from "@rn-web-chat-app/app/src/components/text/text";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ColorHash from 'color-hash'

const colorHash = new ColorHash();

export const DesktopMenu = () => {

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