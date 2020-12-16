import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

export async function getApolloServer(): Promise<ApolloServer> {
  const schema = await buildSchema({
    resolvers: [],
  });
  const server = new ApolloServer({ schema });
  return server;
}
