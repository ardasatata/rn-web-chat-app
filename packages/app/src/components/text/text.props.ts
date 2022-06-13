import { StyleProp, TextProps as TextProperties, TextStyle } from "react-native"
import { TextPresets } from "./text.presets"

export interface TextProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresets

  type?:
    | "header"
    | "subheader"
    | "right-header"
    | "left-header"
    | "hint"
    | "error-message"
    | "left-label"
    | "warning"
    | "button"
    | "button-small"
    | "primary-link"
    | "label-montserrat"
    | "modal-title"
    | "modal-body"
    | "huge"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "body-bold"
    | "body-italic"
    | "body-bold-italic"
    | "label"
    | "label-italic"
    | "label-bold"
    | "label-bold-italic"

  underlineWidth?: number
}
