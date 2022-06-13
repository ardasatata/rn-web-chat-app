import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {color, roundness, spacing} from "../styles";
import React from "react";
import {VStack} from "./view-stack";
import {Spacer} from "./spacer";
import {AnimeSortType} from "../query/type";
import {Text} from "./text/text";

export type FilterSectionProps = {
  activeFilter: AnimeSortType,
  onFilterPress(value: AnimeSortType): void
}

export const FilterSection = ({
                         activeFilter = AnimeSortType.popularity,
                         onFilterPress = () => null
                       }: FilterSectionProps) => {

  const FILTER = (Object.keys(AnimeSortType) as Array<keyof typeof AnimeSortType>).map((key) => key)

  const styles = StyleSheet.create({
    container: {
      minHeight: spacing.extraLarge3,
      marginBottom: spacing.medium
    },
    base: {
      backgroundColor: color.offWhite,
      borderRadius: roundness.circle
    },
    isActive: {
      backgroundColor: color.dark500
    }
  })

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      <Spacer width={spacing.medium}/>
      {
        FILTER.map((item) => (
          <>
            <TouchableOpacity onPress={() => onFilterPress(AnimeSortType[item])}>
              <VStack horizontal={spacing.medium} vertical={spacing.medium}
                      style={[styles.base, activeFilter === AnimeSortType[item] ? styles.isActive : null]}>
                <Text>{AnimeSortType[item]}</Text>
              </VStack>
            </TouchableOpacity>
            <Spacer width={spacing.small}/>
          </>
        ))
      }
    </ScrollView>
  )
}