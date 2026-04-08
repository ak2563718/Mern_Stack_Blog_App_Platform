import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import AddProfile from "../Profile/SideNavItems/AddProfile";

import { Search, BookOpen, Calendar, User, ArrowRight, Menu, X, Heart, MessageCircle, Eye, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {  getallposts, getblogwithinfinite, increaseLike, manageView, SearchPost } from "@/redux/actions/postAction";

const formattedDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const images=["/images/Technology.png",
              "/images/Cooking.png",
              "/images/Creativity.png",
              "/images/Education.png",
              "/images/Finance.png",
              "/images/Science.png",
              "/images/travel.png",
              "/images/Lifestyle.png",
              "/images/Politics.png"]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { blogs, postloading, page, hasMore  }= useSelector((state)=>state.post)
  const { openOnce } = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  useEffect(()=>{
   const delay = setTimeout(() => {
      if(searchQuery.length > 0){
       dispatch(SearchPost(searchQuery))
    }
    }, 500);
     return () => clearTimeout(delay);
  },[searchQuery])

  useEffect(() => {
  const handleScroll = () => {
   if( searchQuery.length === 0 ){
      if (
         window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight / 4  &&
      hasMore &&
      !postloading
    ) {
      dispatch(getblogwithinfinite(page +1));
    }
  };
   } 
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [dispatch, page, hasMore, postloading, searchQuery ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
  {openOnce && <AddProfile />}

  {/* Hero Section */}
  <section className="container mx-auto px-4 py-12 md:py-20 overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="/videos/LandingPage.mp4" type="video/mp4" />
    </video>

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-6">
        Discover Stories That Inspire
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        Join our community of writers and readers sharing knowledge, experiences, and ideas.
      </p>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search articles, topics, or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  </section>

  {/* Blog Section */}
  <section className="container mx-auto px-4 py-12 mt-30">
    <div className="mb-8 relative z-10">
      <h2 className="text-3xl font-bold text-gray-600 mb-2">Latest Articles</h2>
      <p className="text-gray-600">
        {searchQuery
          ? `Found ${blogs.length} result${blogs.length !== 1 ? "s" : ""}`
          : "Explore our most recent posts"}
      </p>
    </div>

    {/* 🔥 CONDITIONAL RENDERING */}
    {blogs.length === 0  ? (
      <div className="flex flex-col items-center justify-center py-20 relative z-10 text-center">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-10 py-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No Blogs Found 😔
          </h3>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 relative z-10">
        {Array.isArray(blogs) &&
          blogs.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                
                <div
                  onClick={() => navigate(`/blog/${post._id}`)}
                  className="aspect-video overflow-hidden"
                >
                  <img
                    src={post.coverImage.secure_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="p-5 flex flex-col">
                  <Badge className="w-fit mb-2 text-xs">{post.category}</Badge>

                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">
                    {post.summary}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formattedDate(post.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between w-full text-xs text-gray-500">
                      
                      <div className="flex items-center gap-3">

                        {/* Likes */}
                        <div
                          onClick={() => {
                            dispatch(increaseLike(post._id));
                            dispatch(getallposts());
                          }}
                          className="flex items-center hover:text-red-400 transition"
                        >
                          <Heart className="w-4 h-4" />
                          <span>{post.likescount || 0}</span>
                        </div>

                        {/* Comments */}
                        <div
                          onClick={() => navigate(`/blog/${post._id}#commentfield`)}
                          className="flex items-center gap-1 hover:text-blue-400 transition"
                        >
                          <MessageCircle className="w-4 h-4" />
                        
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
    )}

    {/* Image Scroll */}
    <div className="overflow-hidden w-full mt-10">
      <div
        onClick={() => navigate("/category")}
        className="flex animate-scroll gap-10 w-max hover:[animate-play-state:paused] cursor-pointer"
      >
        {images.concat(images).map((img, index) => (
          <img
            key={index}
            src={img}
            alt="scroll"
            className="h-40 w-auto object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  </section>
</div>
  );
}
