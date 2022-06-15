import React from "react";
import {
  Platform,
  StyleSheet,
  View,
} from "react-native";

import {ApolloProvider} from '@apollo/client';

import {subplatform} from "./config";
import Navigator from "./routes";
import {client} from "./query";


export function App(): JSX.Element {
  const platformValue = subplatform
    ? `${Platform.OS} (${subplatform})`
    : Platform.OS;
  return (
    <View style={styles.root}>
      <ApolloProvider client={client}>
        <Navigator/>
      </ApolloProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: Platform.OS === 'web' ? '100vh' : '100%'
  },
});
