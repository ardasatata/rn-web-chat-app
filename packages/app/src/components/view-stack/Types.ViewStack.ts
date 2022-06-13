import { ReactNode } from "react"
import { ViewProps } from "react-native"

export enum HorizontalAlignment {
  "center" = "center",
  "trailing" = "flex-end",
}

export type HorizontalAlignmentStrings = keyof typeof HorizontalAlignment

export enum VerticalAlignment {
  "center" = "center",
  "top" = "flex-start",
  "bottom" = "flex-end",
}

export type VerticalAlignmentStrings = keyof typeof VerticalAlignment

export interface ViewStackProps extends ViewProps {
  children: ReactNode
  padding?: number
  top?: number
  right?: number
  bottom?: number
  left?: number
  horizontal?: number
  vertical?: number
}
