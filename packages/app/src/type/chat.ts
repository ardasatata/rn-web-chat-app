export type UserType = "Sam" | "Russell" | "Joyse"
export type ChannelIdType = "1" | "2" | "3"

export type MessageItemType = {
  messageId: string
  text: string
  userId: UserType
  datetime: string
}

export enum ChannelIdTypeEnum {
  GENERAL = "1",
  TECHNOLOGY = "2",
  LGTM = "3",
}