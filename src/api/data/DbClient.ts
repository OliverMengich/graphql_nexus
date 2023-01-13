import { readFile, writeFile } from "fs";
import { join } from "path";
import { Post } from "./db";
export class DbClient{
    addPost(newPost: Post): Post | void{
        const res: any= readFile(join(__dirname,'./store.json'),'utf-8',(err,data)=>{
            if (err) {
                return JSON.stringify({
                    err,
                })
            }
            return data
        });
        if (!res.data)return undefined;
        
        const posts: Post[] = JSON.parse(res);
        posts.push(newPost);
        const response: any =  writeFile(join(__dirname, './store.json'), JSON.stringify(posts), (err) => {
            if (err) {
                return JSON.stringify({
                    err,
                })
            }
        });
        if(!res.data) return undefined
        return JSON.parse(response);
    }
}