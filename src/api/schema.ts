import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './graphql';
console.log(__dirname)
export const schema = makeSchema({
    types,
    outputs:{
        typegen: join(__dirname,'graphql','nexus.d.ts'),
        schema: join(__dirname,'graphql','schema.graphql')
    }
})