/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {useQuery, useMutation, ApolloError} from '@apollo/react-hooks';
import {
  FlatList, Image,
  StyleSheet, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {FETCH_LATEST_MESSAGE, GET_ANIME_LIST, POST_MESSAGE} from "../query";
import {isDesc, logger} from "../utils"
import {AnimeSortType} from "../query/type";
import {color, roundness, spacing} from "../styles";
import {HStack, VStack} from "../components/view-stack";
import {Text} from "../components/text/text";
import {Spinner} from "../components/spinner";
import {SearchSection} from "../components/search-section";
import {FilterSection} from "../components/filter-section";
import {CenterText} from "../components/center-text";
import {SearchIcon} from "../assets/svgs";
import {Spacer} from "../components/spacer";
import {AscDescSort} from "../components/asc-desc-sort";
import {Button} from "../components/button/button";

const log = logger().child({module: "ChannelDetails"})

const PER_PAGE = 10

const ChannelDetails = ({navigation}: any) => {

  const [messages, setMessages] = useState<Array<any>>(null)
  const [text, setText] = useState<string>('your');

  const {loading, error, data, refetch} = useQuery(FETCH_LATEST_MESSAGE, {
    variables: {
      channelId: "1"
    },
    pollInterval: 500
  });

  const [postMessage, {
    loading: postLoading, error: postError, data: postData
  }] = useMutation(POST_MESSAGE, {
    variables: {
      channelId: "1",
      text: text,
      userId: "Sam"
    },
  });

  const sendMessage = useCallback(() => {
    postMessage().then((r)=> {
      log.info(r)
      refetch()
    }).catch((error => {
      log.info(error)
      setText("")
    }))
  }, [])

  // useEffect(() => {
  //   log.info(error)
  // }, [error]);
  //
  // const onLoadMore = useCallback(() => {
  //   // !loading && setPage(page + 1)
  //   // log.info(page)
  // }, [page, loading])

  useEffect(() => {
    log.info(error)
    if(error === undefined && !loading){
      log.info(data.fetchLatestMessages)
      setMessages(data.fetchLatestMessages);
    }
  }, [data,error, loading]);

  if (loading) {
    return (
      <Spinner/>
    );
  }

  if (error) {
    return (
      <CenterText text={"Something wrong :("}/>
    );
  }

  return (
    <View style={{flex: 1}}>
      {messages ? (
        messages.length !== 0 ? (
          <FlatList
            inverted
            onEndReached={()=> log.info("end reached")}
            contentContainerStyle={{}}
            data={messages}
            // keyExtractor={(item) => String(item.messageId)}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                id: item.messageId
              })}>
                <HStack left={spacing.medium} vertical={spacing.small}>
                  {/*<Image source={{uri: item.coverImage.large}} style={{*/}
                  {/*  height: spacing[72],*/}
                  {/*  width: spacing[72],*/}
                  {/*}}/>*/}
                  <VStack left={spacing.medium}>
                    <Text numberOfLines={1} type={'body'} style={{color: color.dark900}}>{item.text}</Text>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            )}
            // ListFooterComponent={() => (
            //   <>
            //     {loading ? <Spinner/> : null}
            //
            //   </>
            // )}
            ListFooterComponent={<VStack horizontal={spacing.medium} vertical={spacing.medium} style={[]}>
              <HStack style={{backgroundColor: color.offWhite, borderRadius: roundness.medium}} horizontal={spacing.medium}>
                <Spacer width={spacing.medium}/>
                <TextInput
                  value={text}
                  onChangeText={(value => setText(value))} placeholder={"type message here"}
                  style={{height: spacing.extraLarge2, fontSize: spacing[16], flex: 1}}/>
                <Button type={"primary"} text={"Send"} onPress={sendMessage}/>
              </HStack>
            </VStack>}
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
    </View>
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
