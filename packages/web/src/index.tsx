import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {AppRegistry, Platform, View} from 'react-native';
import "./index.css";
import {ApolloProvider} from "@apollo/client";

import {client} from "@rn-web-chat-app/app/src/query";
import Navigator from "./routes";
import {ChatContextProvider} from "@rn-web-chat-app/app/src/hooks/ChatContextProvider";

export function App(): JSX.Element {
  return (
    <View style={{backgroundColor: 'red', height: '100vh'}}>
      <ApolloProvider client={client}>
        <ChatContextProvider>
          <Navigator/>
        </ChatContextProvider>
      </ApolloProvider>
    </View>
  );
}

AppRegistry.registerComponent('main', () => App);
AppRegistry.runApplication('main', {
  rootTag: document.getElementById('root'),
});
