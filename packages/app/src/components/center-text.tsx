import {View} from "react-native";
import {layout} from "../styles";
import React from "react";
import {Text} from "./text/text";

export const CenterText = ({text}: { text: string }) => {
  return (
    <View style={[layout.flex, layout.heightFull, layout.flexRowCenter, layout.flexCenterMid]}>
      <Text>{text}</Text>
    </View>
  )
}