import {ErrorsType} from "../Errors";
import {ChannelIdType, MessageItemType, UserType} from "./useChatApp";

export type GlobalChatContext = {
  messages: Array<MessageItemType> | null
  text: string
  setText(message: string): void
  loading: boolean
  error: ErrorsType | null
  sendMessage(): void
  setActiveChannel(channelId: ChannelIdType): void
  fetchMoreMessage(): void
  activeUser: UserType
  setActiveUser(user: UserType): void
  fetchInitialData(): void
  postMessageLoading: boolean
  resendUnsent(messageItem: MessageItemType): void
  unsentMessages: Array<MessageItemType>
  activeChannel: ChannelIdType
}