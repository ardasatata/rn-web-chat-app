import React from "react"
import { View } from "react-native"
import { layout } from "../../styles"

interface Props {
  width?: number
  height?: number
}

const Spacer = ({ width, height }: Props) => {
  if (width) {
    return <View style={{ width }} />
  }

  if (height) {
    return <View style={{ height }} />
  }

  return <View style={layout.flex} />
}

Spacer.defaultProps = {
  width: undefined,
  height: undefined,
}

export default Spacer
