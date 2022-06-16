import gql from "graphql-tag";
import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
  cache: new InMemoryCache(),
});

export const FETCH_LATEST_MESSAGE = gql`
  query FetchLatestMessages($channelId: String!){
    fetchLatestMessages(channelId: $channelId){
      messageId
      text
      datetime
      userId
    }
}
`;

export const POST_MESSAGE = gql`
  mutation PostMessage($channelId: String!, $text: String!, $userId: String!){
    postMessage(channelId: $channelId, text: $text, userId: $userId){
       messageId
       text
       datetime
       userId
     }
  }
`;

export const FETCH_MORE_MESSAGE = gql`
  query FetchMoreMessage($channelId: String!, $messageId: String!, $old: Boolean!){
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
}
`;