//"@/components/commentbubbke.tsx"

import { formatDistanceToNow } from "date-fns";
import { commentProps } from "@/types/components";



export function CommentBubble({comments}:commentProps) {
  return (
    comments.map((comment) => (
        <article key={comment._id} className="p-4 border rounded-md shadow-sm">
        <header className="flex items-center justify-between mb-2">
          {/* <h3 className="font-semibold text-gray-900">{comment.author}</h3> */}
          <time
            dateTime={new Date(comment._createdAt).toLocaleString()}
            className="text-sm text-gray-500"
            title={new Date(comment._createdAt).toLocaleString()}
          >
            {formatDistanceToNow(new Date(comment._createdAt), { addSuffix: true })}
          </time>
        </header>
        <p className="text-gray-700">{comment.content}</p>
      </article>
      ))
    
  );
}
