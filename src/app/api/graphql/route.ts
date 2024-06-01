import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from '@/graphql/typeDef'
import { resolvers } from "@/graphql/resolver";


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});


const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);
export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}