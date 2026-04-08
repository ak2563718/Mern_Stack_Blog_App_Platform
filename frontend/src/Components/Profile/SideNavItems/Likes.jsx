import { motion } from 'motion/react';
import { Heart, TrendingUp } from 'lucide-react';
import { Card } from '../../ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPostByUser } from '@/redux/actions/postAction';

const blogLikes = [
  {
    id: 1,
    title: "Building Modern Web Applications with React",
    likes: 1248,
    category: "Development"
  },
  {
    id: 2,
    title: "Clean Code Principles Every Developer Should Know",
    likes: 892,
    category: "Development"
  },
  {
    id: 3,
    title: "The Art of UI/UX Design",
    likes: 756,
    category: "Design"
  },
  {
    id: 4,
    title: "Building Scalable Startup Systems",
    likes: 634,
    category: "Startup"
  },
  {
    id: 5,
    title: "Creative Problem Solving in Tech",
    likes: 521,
    category: "Creativity"
  },
  {
    id: 6,
    title: "Optimizing Your Workspace for Productivity",
    likes: 418,
    category: "Productivity"
  }
];
 export default function LikesSection() {
  const dispatch = useDispatch()
  const { userblog, loading } = useSelector((state)=>state.post)
  const totalLikes = userblog.reduce((sum, blog) => sum + blog.likescount, 0);

  useEffect(()=>{
    dispatch(getPostByUser())
  },[loading])

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Blog Likes</h2>
        <p className="text-sm text-gray-600">Posts ranked by community appreciation</p>
      </motion.div>

      {/* Total Likes Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-br from-pink-50 to-red-50 p-5 border-pink-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Total Likes</p>
              <p className="text-3xl font-bold text-gray-900">{totalLikes.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Likes List */}
      <div className="space-y-3">
        {Array.isArray(userblog) &&  userblog.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ x: 8 }}
          >
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xl font-bold text-gray-400">#{index + 1}</span>
                    <h3 className="text-base font-semibold text-gray-900">{blog.title}</h3>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                    {blog.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 ml-4">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  <span className="text-xl font-bold text-gray-900">
                    {blog.likescount.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
