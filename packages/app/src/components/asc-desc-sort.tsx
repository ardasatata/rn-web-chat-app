import {TouchableOpacity} from "react-native";
import {color, spacing} from "../styles";
import React from "react";
import {HStack} from "./view-stack";
import {SortAsc, SortDesc} from "../assets/svgs";
import {Spacer} from "./spacer";
import {Text} from "./text/text";

export type AscDescSortType = {
  isDesc: boolean
  onTogglePress(value: boolean): void
}

export const AscDescSort = ({isDesc, onTogglePress}: AscDescSortType) => {
  if (isDesc)
    return (
      <TouchableOpacity onPress={() => onTogglePress(false)}>
        <HStack>
          <SortDesc fill={color.dark900} height={spacing[20]} width={spacing[20]}/>
          <Spacer width={spacing.small}/>
          <Text>{`Descending`}</Text>
        </HStack>
      </TouchableOpacity>
    )

  else
    return (
      <TouchableOpacity onPress={() => onTogglePress(true)}>
        <HStack>
          <SortAsc fill={color.dark900} height={spacing[20]} width={spacing[20]}/>
          <Spacer width={spacing.small}/>
          <Text>{`Ascending`}</Text>
        </HStack>
      </TouchableOpacity>
    )
}