import {ActivityIndicator, View} from "react-native";
import {layout, spacing} from "../styles";
import React from "react";

export const Spinner = () => (
  <View style={[layout.flex, layout.heightFull, layout.flexRowCenter, layout.flexCenterMid]}>
    <ActivityIndicator size={spacing[64]}/>
  </View>
)