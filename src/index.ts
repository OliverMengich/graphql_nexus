// import { context } from "./api/context";
import { context } from "./api/context";
import { server } from "./api/server";
import {startStandaloneServer} from '@apollo/server/standalone';
const url=startStandaloneServer(server,{
    context:async () => ({
        db: context.db
    })
});
console.log(url.then((url) => console.log(`🚀 Server ready at ${url}`)));
// console.log(`🚀 Server ready at ${url}`);
