import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { color, spacing, roundness } from "../../styles"
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    type,
    ...rest
  } = props

  const viewStyle = viewPresets[preset] || viewPresets.primary
  const viewStyles = [viewStyle, styleOverride]
  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text tx={tx} text={text} style={textStyles} />

  if (type === "primary") {
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: color.primary900,
            borderRadius: roundness.xs,
            paddingVertical: spacing[14],
            alignContent: "center",
          },
          styleOverride,
        ]}
        {...rest}
      >
        <Text type={"button"} tx={tx} text={text} style={textStyleOverride} />
      </TouchableOpacity>
    )
  }

  if (type === "transparent") {
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: color.transparent,
          },
          styleOverride,
        ]}
        {...rest}
      >
        {content}
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      {content}
    </TouchableOpacity>
  )
}
