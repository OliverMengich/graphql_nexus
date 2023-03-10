import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";
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
            async resolve(_root, _args, ctx) {
                return await ctx.db.getPosts() ? ctx.db.getPosts() : [];
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
            async resolve(_root, args, ctx){
                // console.log(ctx.db.posts.length)
                const draft = {
                    id: 0,
                    title: args.title,
                    content: args.content,
                    author: args.author,
                    published: false
                }
                const res = await ctx.db.addPost(draft)
                return res;
            }
        })
        t.nonNull.field('publish',{
            type: Post,
            args: {
                id: nonNull(intArg()),
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
                author: nonNull(stringArg())
            },
            async resolve(_root, args,ctx){
                // let draftToPublish = ctx.db.getPosts()?.find((draft: any)=>draft.id===args.id);
                const draft = {
                    id: 0,
                    title: args.title,
                    content: args.content,
                    author: args.author,
                    published: false
                }
                let draftToPublish = await ctx.db.updatePost(draft)
                if (!draftToPublish) {
                    throw new Error("Couldn't find draft")
                }
                draftToPublish.published=true
                return draftToPublish;
            }
        })
    }
});

