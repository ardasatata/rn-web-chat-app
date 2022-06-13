import gql from "graphql-tag";
import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
  cache: new InMemoryCache(),
});

export const GET_ANIME_LIST = gql`
  query AnimeList($page: Int, $perPage: Int, $sort: [MediaSort], $search: String) {
    Page(page: $page, perPage: $perPage) {
      media(sort: $sort, search: $search) {
        coverImage {
          large
          color
        }
        title {
          romaji
          english
          native
          userPreferred
        }
        type
        popularity
        averageScore
        id
        tags {
          id
          name
        }
      }
    }
  }
`;

export const GET_ANIME_DETAIL = gql`
  query AnimeDetail($id: Int) {
    Media(id: $id){
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      description
      type
      bannerImage 
      coverImage {
        extraLarge
        large
        medium
        color
      }
      popularity
      isAdult
      tags {
        id
        name
      }
    }
  }
`;

export const FETCH_LATEST_MESSAGE = gql`
  query fetchLatestMessages($channelId: String!){
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

// export const POST_MESSAGE = gql`
//   mutation PostMessage($channelId: String!, $text: String!, $userId: Sam!){
//     postMessage(channelId: $channelId", text: $text, userId: $userId){
//       messageId
//       text
//       datetime
//       userId
//     }
//   }
// `;