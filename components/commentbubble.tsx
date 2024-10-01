//"@/components/commentbubbke.tsx"

import { formatDistanceToNow } from "date-fns";
import { commentProps } from "@/types/components";



export function CommentBubble({comments}:commentProps) {
  return (
    comments.map((comment) => (
        <article key={comment._id} className="p-4 rounded-3xl bg-[#f3f1ff9a] text-[#3e2c5a]">
        <header className="flex items-center justify-between mb-2">
          {/* <h3 className="font-semibold text-gray-900">{comment.author}</h3> */}
          <time
            dateTime={new Date(comment._createdAt).toLocaleString()}
            className="text-sm  text-[#685a7d]"
            title={new Date(comment._createdAt).toLocaleString()}
          >
            {formatDistanceToNow(new Date(comment._createdAt), { addSuffix: true })}
          </time>
        </header>
        <p className="text-start">{comment.content}</p>
      </article>
      ))
    
  );
}
