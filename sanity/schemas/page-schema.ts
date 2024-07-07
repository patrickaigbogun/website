import { kMaxLength } from "buffer";
import { title } from "process";

const page = {
    name: "page",
    title: "Pages",
    type: "document",
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                kMaxLength: 96,
            }
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{type: 'block'}],
        },
    ]
}

export default page;