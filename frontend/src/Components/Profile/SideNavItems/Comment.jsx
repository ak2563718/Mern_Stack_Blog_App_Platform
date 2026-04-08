import { motion } from 'motion/react';
import { MessageSquare, Reply } from 'lucide-react';
import { Card } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { commentofUserPost } from '@/redux/actions/commentAction';

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

export function CommentsSection() {
  
  const { userComment } = useSelector((state)=>state.comment)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(commentofUserPost())
  },[])
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Comments</h2>
        <p className="text-sm text-gray-600">Recent discussions and feedback</p>
      </motion.div>

      {/* Comments Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 border-green-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Total Comments</p>
                <p className="text-3xl font-bold text-gray-900">{userComment.length}</p>
              </div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="flex items-center gap-4">
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Comments List */}
      <div className="space-y-4">
        {userComment.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-5 hover:shadow-md transition-shadow">
              {/* Blog Title Reference */}
              <div className="mb-3 pb-3 border-b">
                <span className="text-xs text-gray-500">Comment on:</span>
                <h3 className="text-sm font-semibold text-gray-900 mt-0.5">{comment.postId.title}</h3>
              </div>

              {/* Comment Content */}
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={comment.userId?.name[0]} alt={comment.userId?.name} />
                  <AvatarFallback>{comment.userId?.name.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-gray-900">{comment.userId?.name || "Unknown User"}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{timeAgo(comment.createdAt)}</span>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{comment.comment}</p>

                  <div className="flex items-center gap-3">
                    
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
