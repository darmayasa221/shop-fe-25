import { BlogComment } from "../../types/blog";

type CommentListProps = {
  comments: BlogComment[];
};

const CommentItem = ({ comment }: { comment: BlogComment }) => {
  return (
    <div className="mb-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          {/* Use initials as avatar placeholder */}
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
            {comment.author
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <h4 className="font-medium">{comment.author}</h4>
            <div className="text-xs text-gray-500">
              {comment.date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Reply button could be added here if implementing reply functionality */}
      </div>

      <div className="mt-2 text-gray-700">
        <p>{comment.content}</p>
      </div>

      {/* Render replies if any */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 border-l-2 border-gray-200 pl-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="mb-4 last:mb-0">
              <div className="flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                  {reply.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <h5 className="text-sm font-medium">{reply.author}</h5>
                  <div className="text-xs text-gray-500">
                    {reply.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                <p>{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CommentList = ({ comments }: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
        <p className="text-gray-600">
          No comments yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-medium">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h3>

      <div className="divide-y divide-gray-100">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
