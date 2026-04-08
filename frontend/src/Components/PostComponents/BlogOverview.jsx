import { getPostById, manageView } from "@/redux/actions/postAction";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommentField from './Comment'

const formattedDate =(DateString)=>{
  const options = { year:"numeric", month:"long", day:"numeric"}
  return new Date(DateString).toLocaleDateString(undefined,options)
}
export function BlogOverview() {
  const { id } = useParams();
  const hashed = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog, postloading } = useSelector((state) => state.post);
 

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostById(id));
    dispatch(manageView(id));
  }, [id]);

  useEffect(() => {
    if (hashed.hash) {
      const el = document.querySelector(hashed.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hashed]);

  return (
    <motion.article
      className="max-w-6xl mx-auto mt-20 px-4 md:px-6" // ✅ wider + padding
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Image Banner */}
      <motion.div
        className="relative w-full h-[250px] md:h-[320px] rounded-xl overflow-hidden shadow-xl mb-6" // ✅ reduced height
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        whileHover={{ scale: 1.01 }}
      >
        <img
          src={blog.coverImage?.secure_url}
          alt={blog.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        <motion.div
          className="absolute top-4 left-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="px-3 py-1.5 bg-white/90 text-gray-900 rounded-full text-xs font-semibold shadow">
            {blog.category}
          </span>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="md:px-4">
        {/* Title */}
        <motion.h1
          className="text-3xl md:text-5xl mb-5 text-gray-900 font-bold leading-tight" // ✅ bigger title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {blog.title}
        </motion.h1>

        {/* Author & Date */}
        <motion.div
          className="flex flex-wrap items-center gap-6 mb-6 pb-5 border-b border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
              {blog.author?.[0]}
            </div>
            <div>
              <p className="text-xs text-gray-500">Written by</p>
              <p className="font-semibold text-gray-900">{blog.author}</p>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

          <div>
            <p className="text-xs text-gray-500">Published</p>
            <p className="font-medium text-gray-900">
              {formattedDate(blog.createdAt)}
            </p>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-base text-gray-800 italic leading-relaxed">
            {blog.summary}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-[17px] text-gray-700 leading-8">
            {blog.content}
          </p>
        </motion.div>
      </div>

      {/* Comments */}
      <div id="commentfield" className="mt-10">
        <CommentField />
      </div>
    </motion.article>
  );
}