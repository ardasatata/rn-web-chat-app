import {ErrorsType} from "../Errors";
import {ChannelIdType, MessageItemType, UserType} from "../type/chat";

export type GlobalChatContext = {
  messages: Array<MessageItemType> | null
  text: string
  setText(message: string): void
  loading: boolean
  error: ErrorsType | null
  sendMessage(): void
  setActiveChannel(channelId: ChannelIdType): void
  fetchMoreMessage(activeChannel: ChannelIdType, tailMessageId: MessageItemType | null): void
  activeUser: UserType
  setActiveUser(user: UserType): void
  fetchInitialData(): void
  postMessageLoading: boolean
  resendUnsent(messageItem: MessageItemType): void
  unsentMessages: Array<MessageItemType>
  activeChannel: ChannelIdType
  tailMessageId: MessageItemType | null
  renderLoading: boolean
}