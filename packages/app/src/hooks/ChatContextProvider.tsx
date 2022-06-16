import React, {createContext} from "react";
import {GlobalChatContext} from "./GlobalChatContext";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import {FETCH_LATEST_MESSAGE, FETCH_MORE_MESSAGE, POST_MESSAGE} from "../query";
import {logger, timeout} from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ErrorsType} from "../Errors";
import {MessageItemType, ChannelIdType, UserType} from "../type/chat";

const log = logger().child({module: "ChatContextProvider"})

const defaultUnsentMessages = [
  {
    messageId: `unsent-${Math.floor(Math.random() * 100)}`,
    text: "unsent-1",
    userId: "Sam",
    datetime: "",
    channelId: "1"
  },
  {
    messageId: `unsent-${Math.floor(Math.random() * 100)}`,
    text: "unsent-2",
    userId: "Sam",
    datetime: "",
    channelId: "1"
  }
]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ChatContext = createContext<GlobalChatContext>(null);

export const ChatContextProvider:React.FC = ({children}) => {

  const [messages, setMessages] = useState<Array<MessageItemType> | null>(null)
  const [unsentMessages, setUnsentMessages] = useState<Array<MessageItemType>>([])

  const [text, setText] = useState<string>('');

  const [channelId, setChannelId] = useState<ChannelIdType>("1");
  const [activeUser, setActiveUser] = useState<UserType>("Sam");

  const [headMessageId, setHeadMessageId] = useState<MessageItemType | null>(null);
  const [tailMessageId, setTailMessageId] = useState<MessageItemType | null>(null);

  const [error, setError] = useState<ErrorsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [ fetchInitialData, {loading: initialLoading}] = useLazyQuery(FETCH_LATEST_MESSAGE, {
    variables: {
      channelId: channelId
    },
    onCompleted: (data) => {
      const messages:Array<MessageItemType> = data.fetchLatestMessages
      setHeadMessageId(messages[0])
      setTailMessageId(messages[messages.length - 1])
      setMessages(messages);
      getUnsentMessagesFromStorage()
    },
    onError: () => {
      setError("initial-error")
    }
  });

  useEffect(()=>{
    fetchInitialData()
  },[channelId])

  const [postMessage, {
    loading: postMessageLoading,
  }] = useMutation(POST_MESSAGE, {
    variables: {
      channelId: channelId,
      text: text,
      userId: activeUser
    },
  });

  const [queryMoreMessage] = useLazyQuery(FETCH_MORE_MESSAGE, {
    fetchPolicy: 'network-only',
  });

  const {loading: fetchNewLoading, error: fetchNewError, data: fetchNewData, refetch: refetchNewData} = useQuery(FETCH_MORE_MESSAGE, {
    fetchPolicy: 'network-only',
    skip: !headMessageId
  });

  const fetchMoreMessage = useCallback((channelId, tailMessageId) => {
    if(!initialLoading){
      queryMoreMessage({
        variables: {
          channelId: channelId,
          messageId: tailMessageId?.messageId ?? '',
          old: true
        },
      }).then(({data, error})=>{
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
    }
  }, [initialLoading, messages])

  const addToUnsend = useCallback(async (message: string) => {
    const unsendMessage:MessageItemType = {
      messageId: `unsent-${Math.random() * 100}`,
      text: message,
      userId: activeUser,
      datetime: "",
      channelId: channelId
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setUnsentMessages((prevState)=> [unsendMessage, ...prevState])

    await AsyncStorage.getItem('unsent_list')
      .then((list) => {
        const l:Array<MessageItemType> = list ? JSON.parse(list) : [];
        l.unshift(unsendMessage as MessageItemType);
        AsyncStorage.setItem('unsent_list', JSON.stringify(l));
      });
  }, [activeUser, channelId])

  const sendMessage = useCallback(() => {
    if(text !== ""){
      try{
        setLoading(true)
        postMessage().then((r)=> {
          if(messages === null){
            fetchInitialData().then()
          }

        }).catch((e => {
          addToUnsend(text).then()
        }))
      } finally {
        setLoading(false)
        setText("")
      }
    }
  }, [activeUser, channelId, headMessageId, text])

  const resendUnsent = useCallback((messageItem: MessageItemType) => {
    if(!postMessageLoading){
      try{
        setLoading(true)
        postMessage({
          variables:{
            channelId: channelId,
            text: messageItem.text,
            userId: activeUser
          }}
        ).then((r)=> {
          setUnsentMessages((prevState => prevState.filter((item)=> item.messageId !== messageItem.messageId)))
        })
      } finally {
        setLoading(false)
      }
    }
  }, [activeUser, channelId, postMessageLoading])

  const setActiveChannel = useCallback((userId: ChannelIdType) => {
    setChannelId(userId)
    setMessages(null)
    setError(null)
    setText("")
    setTailMessageId(null)
    setHeadMessageId(null)
  }, [channelId])

  const fetchNewMessage = useCallback(() => {
    refetchNewData({
      channelId: channelId,
      messageId: headMessageId?.messageId ?? '',
      old: false
    }).catch()
  }, [channelId, headMessageId])

  useEffect(() => {
    if(fetchNewError === undefined && !fetchNewLoading){
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

  const [renderLoading, setRenderLoading] = useState<boolean>(false)

  useEffect(()=>{
    const timeoutLoading = async () => {
      setRenderLoading(true)
      await timeout(1500)
    }
    timeoutLoading().then((() => {
      setRenderLoading(false)
    }))
  }, [activeUser, channelId])

  useEffect(()=>{
    if(!renderLoading && !postMessageLoading){
      const interval = setInterval(() => {
        fetchNewMessage()
      }, 1000);
      return () => clearInterval(interval);
    }
  },[renderLoading, postMessageLoading])

  const [unsentFiltered, setUnsentFiltered] = useState(unsentMessages)

  useEffect(()=>{
    setUnsentFiltered((unsentMessages.filter((value => value.userId === activeUser))))
  }, [unsentMessages, activeUser])

  const getUnsentMessagesFromStorage = useCallback(async () => {
    try {
      await AsyncStorage.getItem('unsent_list')
        .then((list) => {
          const l = list ? JSON.parse(list) : [];
          setUnsentMessages(l)
        });
    } catch (e) {
      log.info("AsyncStorage failed")
    }
  }, [unsentMessages])

  useEffect(()=>{
    const loadText = async () => {
      await AsyncStorage.getItem(`text_editor`).then((value) => {
        if(value){
          setText(value)
        }else{
          setText("")
        }
      }).catch(e => log.info(e))
    }
    loadText()
  },[activeUser])

  useEffect(()=>{
    const saveText = async () => {
      await AsyncStorage.setItem(`text_editor`, text).then(() => null).catch(e => log.info(e))
    }
    saveText()
  },[text])

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
      unsentMessages: unsentFiltered,
      activeChannel: channelId,
      tailMessageId,
      renderLoading
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
      unsentFiltered,
      channelId,
      tailMessageId,
      renderLoading
    ]
  );

  return(
    <ChatContext.Provider value={appContextValue} >
      {children}
    </ChatContext.Provider>
  )
}