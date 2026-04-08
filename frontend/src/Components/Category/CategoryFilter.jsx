import { Button } from "../ui/button";
import { Card } from '../ui/card'
import { Badge } from "../ui/badge"
import { motion } from "motion/react";
import { Calendar ,Clock , Heart ,Eye , MessageCircle} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getallposts, increaseLike, searchwithcategory } from "@/redux/actions/postAction";
import Loader from "../UserComponent/Loader";
import { useNavigate } from "react-router-dom";
export const categories = [
  "All",
  "Technology",
  "Education & Learning",
  "LifeStyle",
  "Travel",
  "Food Cooking",
  "Science",
  "Politics & Society",
  "Finance & Money",
  "Creative & Arts"
];

export default function CategoryFilter() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allblogs, postloading } = useSelector((state)=>state.post)

  useEffect(()=>{
    window.scrollTo(0,0)
    dispatch(getallposts())
  },[])

  return (
    <div  className="bg-background mt-20 border-b shadow-sm ">
      {postloading && <Loader />}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() =>{
                  if(category === "All"){
                    return dispatch(getallposts())
                  }
                  dispatch(searchwithcategory(category))
              } }
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 relative  z-10">
        {Array.isArray(allblogs) && allblogs.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Card  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
              <div onClick={() => {
                navigate(`/blog/${post._id}`)
                }} className="aspect-video overflow-hidden">
                <img
                  src={post.coverImage.secure_url}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-5  flex flex-col">
                <Badge className="w-fit mb-2 text-xs">{post.category}</Badge>
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">
                  {post.summary}
                </p>
                <div className="flex items-center  gap-3 text-xs text-gray-500 pt-3 border-t">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime} min</span>
                  </div>
                 
                </div>
                <div className="mt-4">
                   <div className="flex items-center justify-between w-full text-xs text-gray-500">

              {/* Like comment and view */}
              <div className="flex items-center gap-3">

                {/* Likes */}
                <div onClick={()=>{
                  dispatch(increaseLike(post._id))
                  dispatch(getallposts())}} className="flex items-center gap- hover:text-red-400 transition">
                  <Heart className="w-4 h-4" />
                  <span >{post.likescount || 0}</span>
                </div>

                {/* Comments */}
                <div onClick={()=>navigate(`/blog/${post._id}#commentfield`)} className="flex items-center gap-1 hover:text-blue-400 transition">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments || 0}</span>
                </div>

                {/* Views */}
                <div className="flex items-center gap-1 hover:text-green-400 transition">
                  <Eye className="w-4 h-4" />
                  <span>{post.viewscount || 0}</span>
                </div>

              </div>

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