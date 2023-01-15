import { readFile,readFileSync, writeFile, writeFileSync } from "fs";
import { join } from "path";
import { Post } from "./db";
export  class DbClient{
    getPosts(): Post[]{
        const posts: Post[] =  JSON.parse(readFileSync(join(__dirname, './store.json'), 'utf-8'))
        return posts;
    }
    addPost(newPost: Post): Post{
        const posts: Post[]= JSON.parse(readFileSync(join(__dirname,'./store.json'),'utf-8'));
        newPost.id = posts.length+1;
        posts.push(newPost);
        writeFileSync(join(__dirname, './store.json'), JSON.stringify(posts),{encoding: 'utf-8', flag : "w"});
        console.log("File written successfully");
        return JSON.parse(JSON.stringify(newPost))
    }
    updatePost(updatePost: Post):Post {
        const posts: Post[] = JSON.parse(readFileSync(join(__dirname,'./store.json'),'utf-8'));
        const {id} = updatePost;
        const idx = posts.findIndex(x=>x.id===id);
        posts[idx] = updatePost;
        writeFileSync(join(__dirname,'./store.json'),JSON.stringify(posts), {encoding: 'utf-8', flag: "w"});   
        return JSON.parse(JSON.stringify(posts[idx]));
    }
}