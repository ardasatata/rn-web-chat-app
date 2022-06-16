import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {AppRegistry, Platform, View} from 'react-native';
import "./index.css";
// import { App } from "@rn-web-chat-app/app";
import reportWebVitals from "./reportWebVitals";
import {subplatform} from "@rn-web-chat-app/app/src/config";
import {ApolloProvider} from "@apollo/client";

import { ReactComponent as AppleSVG } from '@rn-web-chat-app/app/src/assets/svgs/appleIcon.svg';
import {client} from "@rn-web-chat-app/app/src/query";
import Navigator from "./routes";
import {ChatContextProvider} from "@rn-web-chat-app/app/src/hooks/ChatContextProvider";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

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
