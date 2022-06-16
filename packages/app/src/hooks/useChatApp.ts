import {useCallback, useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {FETCH_LATEST_MESSAGE, FETCH_MORE_MESSAGE, POST_MESSAGE} from "../query";
import {logger} from "../utils";
import {ErrorsType} from "../Errors";

const log = logger().child({module: "useChatApp"})

export type chatAppContext = {
  messages: Array<MessageItemType> | null
  text: string
  setText(message: string): void
  loading: boolean
  error: ErrorsType | null
  sendMessage(): void
  changeUser(userId: ChannelIdType): void
  fetchMoreMessage(): void
  activeUser: UserType
  setActiveUser(user: UserType): void
}

export type UserType = "Sam" | "Russell" | "Joyse"
export type ChannelIdType = "1" | "2" | "3"

export type MessageItemType = {
  messageId: string
  text: string
  userId: UserType
  datetime: string
  channelId: string
}

export default function useChatApp(): chatAppContext {

  const [messages, setMessages] = useState<Array<MessageItemType> | null>(null)

  const [unsentMessages, setUnsentMessages] = useState<Array<MessageItemType> | null>(null)

  const [text, setText] = useState<string>('your');

  const [channelId, setChannelId] = useState<ChannelIdType>("1");
  const [activeUser, setActiveUser] = useState<UserType>("Sam");

  const [headMessageId, setHeadMessageId] = useState<MessageItemType | null>(null);
  const [tailMessageId, setTailMessageId] = useState<MessageItemType | null>(null);

  const [error, setError] = useState<ErrorsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {loading: initialLoading, error: initialError, data: initialData, refetch: initialRefetch} = useQuery(FETCH_LATEST_MESSAGE, {
    variables: {
      channelId: channelId
    },
    // pollInterval: 500,
  });

  const [postMessage, {
    loading: postLoading, error: postError, data: postData
  }] = useMutation(POST_MESSAGE, {
    variables: {
      channelId: channelId,
      text: text,
      userId: activeUser
    },
  });

  const {loading: fetchLoading, error: fetchError, data: fetchData, refetch: fetchRefetch} = useQuery(FETCH_MORE_MESSAGE, {
    variables: {
      channelId: channelId,
      // messageId: tailMessageId?.messageId ?? '',
      old: true
    },
    fetchPolicy: 'network-only',
    skip: !tailMessageId
  });

  const {loading: fetchNewLoading, error: fetchNewError, data: fetchNewData, refetch: newFetchRefetch} = useQuery(FETCH_MORE_MESSAGE, {
    variables: {
      channelId: channelId,
      // messageId: tailMessageId?.messageId ?? '',
      old: false
    },
    fetchPolicy: 'network-only',
    skip: !headMessageId
  });

  const fetchOldMessage = useCallback(() => {
    fetchRefetch({
      channelId: channelId,
      messageId: tailMessageId?.messageId ?? '',
      old: true
    }).catch(e => setError("generic-error"))
  }, [channelId, tailMessageId, messages])

  const fetchNewMessage = useCallback(() => {
    newFetchRefetch({
      channelId: channelId,
      messageId: headMessageId?.messageId ?? '',
      old: false
    }).catch(e => setError("generic-error"))
  }, [channelId, headMessageId, messages])

  const sendMessage = useCallback(() => {
    log.info(activeUser)
    try{
      setLoading(true)
      postMessage().then((r)=> {
        log.info(r)
        setText("")
      }).catch((error => {
        log.info(error)
      }))
    } finally {
      setLoading(false)
    }
  }, [activeUser, channelId, headMessageId])

  const resendUnsent = useCallback((text: string) => {
    try{
      setLoading(true)
      postMessage().then((r)=> {
        log.info(r)
        setText("")
      }).catch((error => {
        log.info(error)
      }))
    } finally {
      setLoading(false)
    }
  }, [activeUser, channelId, headMessageId])

  useEffect(() => {
    if(initialError === undefined && !initialLoading){
      const messages:Array<MessageItemType> = initialData.fetchLatestMessages
      setHeadMessageId(messages[0])
      setTailMessageId(messages[messages.length - 1])
      setMessages(messages);
    }
  }, [initialData, initialError, initialLoading]);

  useEffect(() => {
    log.info("fetchdata old")
    if(fetchError === undefined && !fetchLoading){
      log.info(fetchData)
      log.info(fetchLoading)
      log.info(fetchError)
      if(fetchData){
        const messages:Array<MessageItemType> = fetchData.fetchMoreMessages
        // setHeadMessageId(messages[0])
        if(messages.length > 0){
          setTailMessageId(messages[messages.length - 1])
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setMessages((prevState => [...prevState, ...messages]));
      }
    }
  }, [fetchLoading, fetchError, fetchData]);

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

  // useEffect(() => {
  //   if(fetchError){
  //     setError("generic-error")
  //   }else if(postError){
  //     setError("send-failed")
  //   }
  // }, [fetchError, postError]);

  useEffect(() => {
    log.info("messages effect")
    log.info(headMessageId)
    log.info(tailMessageId)
  }, [headMessageId, tailMessageId]);

  useEffect(() => {
    log.info("messages effect")
    log.info(messages)
  }, [messages]);

  useEffect(()=>{
    // setInterval(()=>{
    //   fetchNewMessage()
    // },1000)

    const interval = setInterval(() => {
      fetchNewMessage();
    }, 1000);
    return () => clearInterval(interval);
  })

  useEffect(() => {
    log.info("active user")
    log.info(activeUser)
  }, [activeUser]);

  return {
    messages,
    text,
    setText,
    loading,
    error: error,
    sendMessage,
    changeUser(userId: ChannelIdType) {
      setChannelId(userId)
    },
    fetchMoreMessage(){
      log.info("on end")
      fetchOldMessage()
    },
    activeUser,
    setActiveUser
  };
}