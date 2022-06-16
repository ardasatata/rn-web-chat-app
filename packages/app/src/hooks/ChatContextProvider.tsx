import React, {createContext} from "react";
import {GlobalChatContext} from "./GlobalChatContext";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import {FETCH_LATEST_MESSAGE, FETCH_MORE_MESSAGE, POST_MESSAGE} from "../query";
import {isDesc, logger} from "../utils";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import {ErrorsType} from "../Errors";
import {ChannelIdType, MessageItemType, UserType} from "./useChatApp";

const log = logger().child({module: "AnimeList"})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ChatContext = createContext<GlobalChatContext>(null);

export const ChatContextProvider:React.FC = ({children}) => {

  const [messages, setMessages] = useState<Array<MessageItemType> | null>(null)
  const [unsentMessages, setUnsentMessages] = useState<Array<MessageItemType>>([
    {
      messageId: `unsent-${Math.floor(Math.random() * 100)}`,
      text: "unsent-1",
      userId: "Sam",
      datetime: "",
      channelId: "1"
    }
  ])

  const [text, setText] = useState<string>('your');

  const [channelId, setChannelId] = useState<ChannelIdType>("1");
  const [activeUser, setActiveUser] = useState<UserType>("Sam");

  const [headMessageId, setHeadMessageId] = useState<MessageItemType | null>(null);
  const [tailMessageId, setTailMessageId] = useState<MessageItemType | null>(null);

  const [error, setError] = useState<ErrorsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [ fetchInitialData, {loading: initialLoading, error: initialError}] = useLazyQuery(FETCH_LATEST_MESSAGE, {
    variables: {
      channelId: channelId
    },
    onCompleted: (data) => {
      const messages:Array<MessageItemType> = data.fetchLatestMessages
      setHeadMessageId(messages[0])
      setTailMessageId(messages[messages.length - 1])
      setMessages(messages);
    },
    onError: () => {
      setError("initial-error")
    }
  });

  const [postMessage, {
    loading: postMessageLoading, error: postMessageError, data: postMessageData
  }] = useMutation(POST_MESSAGE, {
    variables: {
      channelId: channelId,
      text: text,
      userId: activeUser
    },
  });

  const [queryMoreMessage, {loading: fetchMoreLoading, error: fetchMoreError, data: fetchMoreData}] = useLazyQuery(FETCH_MORE_MESSAGE, {
    fetchPolicy: 'network-only',
  });

  const {loading: fetchNewLoading, error: fetchNewError, data: fetchNewData, refetch: refetchNewData} = useQuery(FETCH_MORE_MESSAGE, {
    variables: {
      channelId: channelId,
      messageId: '',
      old: false
    },
    fetchPolicy: 'network-only',
    skip: !headMessageId
  });

  const fetchMoreMessage = useCallback(() => {
    queryMoreMessage({
      variables: {
        channelId: channelId,
        messageId: tailMessageId?.messageId ?? '',
        old: true
      },
    }).then(({data, error})=>{
      log.info(data)
      log.info(error)
      const messages:Array<MessageItemType> = data.fetchMoreMessages
      if(error === undefined && data){
        if(messages.length > 0){
          setTailMessageId(messages[messages.length - 1])
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setMessages((prevState => [...prevState, ...messages]));
      }
    }).catch(() => {
      setError("generic-error")
    })
  }, [channelId, tailMessageId, messages])

  const addToUnsend = useCallback((message: string) => {
    log.info(activeUser)
    const unsendMessage:MessageItemType = {
      messageId: `unsent-${Math.random() * 100}`,
      text: message,
      userId: activeUser,
      datetime: "",
      channelId: channelId
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setUnsentMessages((prevState)=> [...prevState, unsendMessage])
  }, [activeUser, channelId])

  const sendMessage = useCallback(() => {
    log.info(activeUser)
    try{
      setLoading(true)
      postMessage().then((r)=> {
        log.info('sent')
        log.info(r)
      }).catch((error => {
        log.info('ada error')
        log.info(error)
        addToUnsend(text)
      }))
    } finally {
      setLoading(false)
      setText("")
    }
  }, [activeUser, channelId, headMessageId, text])

  const resendUnsent = useCallback((messageItem: MessageItemType) => {
    try{
      setLoading(true)
      postMessage({
        variables:{
          channelId: channelId,
          text: messageItem.text,
          userId: activeUser
        }}
      ).then((r)=> {
        log.info(r)
        setUnsentMessages((prevState => prevState.filter((item)=> item.messageId !== messageItem.messageId)))
      }).catch((error => {
        log.info(error)
      }))
    } finally {
      setLoading(false)
    }
  }, [activeUser, channelId])

  const setActiveChannel = useCallback((userId: ChannelIdType) => {
    setChannelId(userId)
  }, [channelId])

  const fetchNewMessage = useCallback(() => {
    refetchNewData({
      channelId: channelId,
      messageId: headMessageId?.messageId ?? '',
      old: false
    }).catch(e => {
      // setError("generic-error")
    })
  }, [channelId, headMessageId])

  useEffect(() => {
    log.info("fetchdata new")
    log.info(fetchNewError)
    if(fetchNewError === undefined && !fetchNewLoading){
      log.info(fetchNewData)
      log.info(fetchNewLoading)
      if(fetchNewData){
        const messages:Array<MessageItemType> = fetchNewData.fetchMoreMessages
        if(messages.length > 0){
          setHeadMessageId(messages[0])
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setMessages((prevState => [...messages, ...prevState]));
      }
    }
  }, [fetchNewLoading, fetchNewError, fetchNewData]);

  useEffect(() => {
    log.info("messages effect")
    log.info(headMessageId)
    log.info(tailMessageId)
  }, [headMessageId, tailMessageId]);

  useEffect(() => {
    log.info("messages effect")
    log.info(messages)
  }, [messages]);

  // useEffect(() => {
  //   if(unsentMessages.length > 0){
  //     setMessages((prevState => [...prevState, ...unsentMessages]))
  //   }
  // }, [unsentMessages]);

  useEffect(()=>{
    const interval = setInterval(() => {
      fetchNewMessage()
    }, 1000);
    return () => clearInterval(interval);
  })

  useEffect(() => {
    log.info("active user")
    log.info(activeUser)
  }, [activeUser]);

  useEffect(() => {
    log.info("Error")
    log.info(error)
  }, [error]);

  const appContextValue = useMemo(
    () => ({
      messages,
      text,
      setText,
      loading,
      error,
      sendMessage,
      setActiveChannel,
      fetchMoreMessage,
      activeUser,
      setActiveUser,
      fetchInitialData,
      postMessageLoading,
      resendUnsent,
      unsentMessages,
      activeChannel: channelId
    }),
    [
      messages,
      text,
      setText,
      loading,
      error,
      sendMessage,
      setActiveChannel,
      fetchMoreMessage,
      activeUser,
      setActiveUser,
      fetchInitialData,
      postMessageLoading,
      resendUnsent,
      unsentMessages,
      channelId
    ]
  );

  return(
    <ChatContext.Provider value={appContextValue} >
      {children}
    </ChatContext.Provider>
  )
}