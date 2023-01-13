import { readFile, writeFile } from "fs";
import { join } from "path";
export interface Post{
    readonly id: number,
    title: string,
    author: string,
    content: string,
    published: boolean,
}
export interface Db{
    posts: Post[] | void,
    
}
function getPosts(): Post[] | void{
    // const {err,data} = readFile(join(__dirname,'./store.json'),'utf-8',(err,data)=>{});
    // type ResponseX = Post[] | undefined;
    const res: any =readFile(join(__dirname, './store.json'), 'utf-8', (err, data) => {
        if (err) {
            return undefined
        }
        console.log(typeof data)
        return data;
    });
    return res
};
function addPost(newPost: Post): Post | undefined{
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
};


export const db: Db = {
    posts: getPosts(),
    // newPost: addPost()
}