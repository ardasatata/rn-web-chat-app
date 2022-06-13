// Allow eslint props spreading to easily inherit props from TextProps.
/* eslint "react/jsx-props-no-spreading": "off" */

import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { HorizontalAlignment, HorizontalAlignmentStrings, ViewStackProps } from "./Types.ViewStack"

interface Props extends ViewStackProps {
  alignment?: HorizontalAlignmentStrings
}

const VStack: React.FC<Props> = ({
  children,
  padding,
  top,
  right,
  bottom,
  left,
  horizontal,
  vertical,
  alignment,
  style,
  ...props
}) => {
  let paddingStyles: StyleProp<ViewStyle> = {
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
    paddingLeft: left,
    paddingHorizontal: horizontal,
    paddingVertical: vertical,
    padding,
  }

  if (alignment) {
    paddingStyles = {
      ...paddingStyles,
      alignItems: HorizontalAlignment[alignment],
    }
  }

  return (
    <View style={[paddingStyles, style]} {...props}>
      {children}
    </View>
  )
}

export default VStack
