import { motion } from 'motion/react';
import { Eye, BarChart3 } from 'lucide-react';
import { Card } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { useSelector } from 'react-redux';

const blogViews = [
  {
    id: 1,
    title: "Building Modern Web Applications with React",
    views: 15420,
    category: "Development",
    growth: 85
  },
  {
    id: 2,
    title: "Clean Code Principles Every Developer Should Know",
    views: 12340,
    category: "Development",
    growth: 72
  },
  {
    id: 3,
    title: "The Art of UI/UX Design",
    views: 9876,
    category: "Design",
    growth: 68
  },
  {
    id: 4,
    title: "Building Scalable Startup Systems",
    views: 8521,
    category: "Startup",
    growth: 55
  },
  {
    id: 5,
    title: "Creative Problem Solving in Tech",
    views: 7234,
    category: "Creativity",
    growth: 48
  },
  {
    id: 6,
    title: "Optimizing Your Workspace for Productivity",
    views: 6109,
    category: "Productivity",
    growth: 40
  }
];

export function ViewsSection() {
  const { userblog } = useSelector((state)=>state.post)
  const totalViews = userblog.reduce((sum, blog) => sum + blog.viewscount, 0);
  const averageViews = Math.round(totalViews / blogViews.length);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Blog Views</h2>
        <p className="text-sm text-gray-600">Analytics and performance metrics</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 border-blue-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 border-purple-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Average Views</p>
                <p className="text-3xl font-bold text-gray-900">{averageViews.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Views List */}
      <div className="space-y-4">
        {userblog.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                    <h3 className="text-base font-semibold text-gray-900">{blog.title}</h3>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                    {blog.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 ml-4">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="text-xl font-bold text-gray-900">
                    {blog.viewscount.toLocaleString()}
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
