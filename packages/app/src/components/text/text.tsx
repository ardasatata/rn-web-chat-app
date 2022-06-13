import * as React from "react"
import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { color, spacing } from "../../styles"
// import VStack from "../view-stack"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = "default",
    text,
    children,
    style: styleOverride,
    ...rest
  } = props

  // figure out which content to use
  const content = text || children

  const style = presets[preset] || presets.default
  const styles = [style, styleOverride]

  if (props.type === "body") {
    return (
      <ReactNativeText
        {...rest}
        style={[
          style,
          {
            fontSize: spacing[16],
          },
          styleOverride,
        ]}
      >
        {content}
      </ReactNativeText>
    )
  }

  if (props.type === "body-bold") {
    return (
      <ReactNativeText
        {...rest}
        style={[
          style,
          {
            fontSize: spacing[16],
            fontWeight: 'bold'
          },
          styleOverride,
        ]}
      >
        {content}
      </ReactNativeText>
    )
  }

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  )
}
