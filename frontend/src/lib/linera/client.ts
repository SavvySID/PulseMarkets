 import { GraphQLClient } from "graphql-request";

 const endpoint =
   import.meta.env.VITE_LINERA_GRAPHQL_HTTP ?? "http://localhost:8080/graphql";

 export const client = new GraphQLClient(endpoint);

 export async function requestGraphQL<T>(
   query: string,
   variables?: Record<string, unknown>
 ) {
   return client.request<T>(query, variables);
 }



