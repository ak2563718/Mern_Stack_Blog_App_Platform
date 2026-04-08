import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentbyPostId, getcommentpagination, postComment } from "@/redux/actions/commentAction";
import { useParams } from "react-router-dom";
import { clearComment } from "@/redux/slices/commentSlice";

const timeAgo = (timestamp)=>{
  const now = new Date();
  const commentData = new Date(timestamp);
  const diffInSeconds = Math.floor((now - commentData) / 1000);

  if(diffInSeconds < 60){
    return `${diffInSeconds} seconds ago`
  } else if(diffInSeconds < 3600){
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if(diffInSeconds < 86400){
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
}

function avatarColor(initials) {
  const colors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  if (!initials || typeof initials !== "string") {
    return "bg-gray-400"; // fallback color
  }

  const index = initials.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function CommentField() {
  const [page, setPage]= useState(1);
  const id = useParams().id;
  const dispatch = useDispatch();
  const { comments ,totalPages, 
   } = useSelector((state) => state.comment);

 
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textareaRef = useRef(null);

  const handleTextareaInput = (e) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(()=>{
    dispatch(clearComment())
  },[])

  useEffect(() =>{
    dispatch(getcommentpagination({page , id}))
  },[page])


  const handleSubmit = () => {
   dispatch(postComment({ id, comment: inputValue }))
  .then(() => {
    dispatch(getCommentbyPostId(id)); // fetch again
    setInputValue("")
  });
  };

  return (
    <div className="mb-16 border-t border-gray-200 pt-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Input */}
      <div className="mb-8">
        <div className="flex gap-3 items-start">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">

            </div>

          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleTextareaInput}
              placeholder="Write your comment..."
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            />

            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isSubmitting}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-6">
        {comments.length === 0 && (
          <p className="text-gray-400 text-sm">
            No comments yet. Be the first!
          </p>
        )}

        {Array.isArray(comments) && comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${avatarColor(comment?.userId?.name?.[0])}`}>
              {comment?.userId?.name?.[0] || "U"}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="font-semibold text-gray-900">
                  {comment.userId?.name || "Unknown User"}
                </span>
                <span className="text-gray-400 text-xs">
                  {timeAgo(comment.createdAt)}
                </span>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {comment.comment}
              </p>
            </div>
         
          </div>
        ))}
      </div>
     { comments.length >0 && (
        <button className="text-blue-400 ml-10 mt-5 cursor-pointer" onClick={()=>{
       (page < totalPages) ? setPage(page +1) :alert("No more comments to load")
       }}>View more..</button>
     )}
    </div>
  );
}