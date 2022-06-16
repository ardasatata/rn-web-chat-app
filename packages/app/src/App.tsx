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
import {ChatContextProvider} from "./hooks/ChatContextProvider";


export function App(): JSX.Element {
  const platformValue = subplatform
    ? `${Platform.OS} (${subplatform})`
    : Platform.OS;
  return (
    <View style={styles.root}>
      <ApolloProvider client={client}>
        <ChatContextProvider>
          <Navigator/>
        </ChatContextProvider>
      </ApolloProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: Platform.OS === 'web' ? '100vh' : '100%'
  },
});
