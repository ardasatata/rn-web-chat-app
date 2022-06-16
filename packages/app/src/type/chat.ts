export type UserType = "Sam" | "Russell" | "Joyse"
export type ChannelIdType = "1" | "2" | "3"

export type MessageItemType = {
  messageId: string
  text: string
  userId: UserType
  datetime: string
  channelId: string
}

export enum ChannelIdTypeEnum {
  GENERAL = "1",
  TECHNOLOGY = "2",
  LGTM = "3",
}

export const ChannelName = {
  1: "General",
  2: "Technology",
  3: "LGTM"
}