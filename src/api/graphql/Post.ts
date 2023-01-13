import { objectType, extendType,interfaceType, stringArg, nonNull, intArg } from "nexus";
export const Post = objectType({
    name: 'Post',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('content');
        t.nonNull.boolean('published');
        t.nonNull.string('author');
    }
})
export const PostQuery = extendType({
    type: 'Query',
    definition(t) {
        t.list.field('posts', {
            type: 'Post',
            resolve(_root, _args, ctx) {
                // return [{id: 1,title: "Hello",content: "Programming",published: true,author: "Mosh Hamedani"}]
                return ctx.db.posts? ctx.db.posts:[]
            },
        })
    }
});
export const PostMutation = extendType({
    type: 'Mutation',
    definition(t){
        t.nonNull.field('createPost',{
            type: 'Post',
            args: {
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
                author: nonNull(stringArg())
            },
            resolve(_root, args, ctx){
                // console.log(ctx.db.posts.length)
                const draft = {
                    id: ctx.db.posts?.length? ctx.db.posts.length+1: 0,
                    title: args.title,
                    content: args.content,
                    author: args.author,
                    published: false
                }
                ctx.db.posts?.push(draft)
                return draft;
            }
        })
        t.nonNull.field('publish',{
            type: Post,
            args: {
                id: nonNull(intArg())
            },
            resolve(_root, args,ctx){
                let draftToPublish = ctx.db.posts?.find((draft: any)=>draft.id===args.id);
                if (!draftToPublish) {
                    throw new Error("Couldn't find draft")
                }
                draftToPublish.published=true
                return draftToPublish;
            }
        })
    }
});

