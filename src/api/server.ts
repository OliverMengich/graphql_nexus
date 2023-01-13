import { ApolloServer } from "@apollo/server";
import { schema } from "./schema";
import { Context,context } from "./context";
export const server = new ApolloServer({
    schema,
})