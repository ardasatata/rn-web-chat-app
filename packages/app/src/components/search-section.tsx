import {TextInput} from "react-native";
import {color, roundness, spacing} from "../styles";
import React from "react";
import {HStack, VStack} from "./view-stack";
import {Spacer} from "./spacer";

export type SearchSectionProps = {
  onChangeText(value: string): void,
  icon?: React.ReactNode,
  placeholder?: string
}

export const SearchSection = ({
                                onChangeText = () => null,
                                icon,
                                placeholder = "Search..."
                              }: SearchSectionProps) => {
  return (
    <VStack horizontal={spacing.medium} vertical={spacing.medium} style={[]}>
      <HStack style={{backgroundColor: color.offWhite, borderRadius: roundness.medium}} horizontal={spacing.medium}>
        {icon}
        <Spacer width={spacing.medium}/>
        <TextInput
          onChangeText={onChangeText} placeholder={placeholder}
          style={{height: spacing.extraLarge2, fontSize: spacing[16], flex: 1}}/>
      </HStack>
    </VStack>
  )
}