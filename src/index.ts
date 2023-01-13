import { server } from "./api/server";
import {startStandaloneServer} from '@apollo/server/standalone';
const url =startStandaloneServer(server);
console.log(url.then((url) => console.log(`🚀 Server ready at ${url}`)));
// console.log(`🚀 Server ready at ${url}`);
