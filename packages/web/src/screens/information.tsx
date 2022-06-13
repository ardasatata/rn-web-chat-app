/* eslint-disable */
// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Text} from "@rn-web-chat-app/app/src/components/text/text";
import {HStack, VStack} from "@rn-web-chat-app/app/src/components/view-stack";
import {Spacer} from "@rn-web-chat-app/app/src/components/spacer";
import {color, spacing} from "@rn-web-chat-app/app/src/styles";
import {useQuery} from "@apollo/react-hooks";
import {GET_ANIME_DETAIL} from "@rn-web-chat-app/app/src/query";
import {logger} from "@rn-web-chat-app/app/src/utils";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import {LinearGradient} from "react-native-gradients";

const log = logger().child({module: "Detail"})

export type DetailDataType = {
  id: number
  title: {
    romaji: string
    english: string
    native: string
    userPreferred: string
  }
  description: string
  type: string
  bannerImage: string
  coverImage: {
    extraLarge: string
    large: string
    medium: string
    color: string
  }
  popularity: number
}

const colorList = [
  {offset: '0%', color: '#000000', opacity: '1'},
  {offset: '29%', color: '#000000', opacity: '0'},
]

// eslint-disable-next-line react/prop-types,@typescript-eslint/ban-ts-comment
// @ts-ignore
const Information = ({route}) => {
  // @ts-ignore
  const {id} = route.params;

  // @ts-ignore
  const [detail, setDetail] = useState<DetailDataType>(null);

  const {loading, error, data} = useQuery(GET_ANIME_DETAIL, {
    variables: {
      id: id
    }
  });

  useEffect(() => {
    if (data) {
      setDetail(data.Media);
    }
    log.info(data)
  }, [data]);

  return (
    <ScrollView style={{backgroundColor: '#000000'}}>
      {detail !== null ?
        <VStack>
          <ImageBackground source={{uri: detail.bannerImage ? detail.bannerImage : detail.coverImage.extraLarge}} style={{
            height: spacing['256'],
          }}>
            <VStack style={{backgroundColor: 'rgba(0,0,0, 0.10)', flex: 1, justifyContent: 'flex-end'}}>
              <div
                style={{
                  backgroundImage: "linear-gradient(rgba(0,0,0, 0),#000000)",
                  color: "darkred",
              }}>
                <VStack horizontal={spacing.medium} bottom={spacing.medium}>
                  <Text type={'body-bold'}
                        style={{color: color.white, fontSize: spacing[32]}}>{detail.title.romaji}</Text>
                  <Text type={'body-bold'}
                        style={{color: color.white, fontSize: spacing[24]}}>{detail.title.native}</Text>
                </VStack>
              </div>
            </VStack>
          </ImageBackground>
          <HStack horizontal={spacing.medium} bottom={spacing.extraMedium}>
            <Text type={'body-bold'} style={{color: color.white, fontSize: spacing[12]}}>{detail.type}</Text>
            <Spacer width={spacing.medium}/>
            <Text type={'body'} style={{color: color.white, fontSize: spacing[12]}}>{`${detail.popularity} `}
              <Text type={'body-bold'} style={{color: color.white, fontSize: spacing[12]}}>
                LIKES
              </Text>
            </Text>
          </HStack>
          <VStack horizontal={spacing.medium}>
            {detail.description ? <Text type={'body'} style={{
              color: color.white,
              fontSize: spacing[14],
              lineHeight: spacing[24]
            }}>{detail.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text> : null}
          </VStack>
        </VStack>
        : null}
      <Spacer height={spacing.extraLarge3}/>
    </ScrollView>
  );
};

export default Information;