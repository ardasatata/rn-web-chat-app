import {TouchableOpacity} from "react-native";
import {color, spacing} from "@rn-web-chat-app/app/src/styles";
import React from "react";
import {HStack} from "@rn-web-chat-app/app/src/components/view-stack";
// import {SortAsc, SortDesc} from "@rn-web-chat-app/app/src/assets/svgs";
import {Spacer} from "@rn-web-chat-app/app/src/components/spacer";
import {Text} from "@rn-web-chat-app/app/src/components/text/text";

import { ReactComponent as SortAsc } from '@rn-web-chat-app/app/src/assets/svgs/sortAsc.svg';
import { ReactComponent as SortDesc } from '@rn-web-chat-app/app/src/assets/svgs/sortDesc.svg';

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