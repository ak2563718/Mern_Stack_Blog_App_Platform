import { motion } from 'motion/react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { use, useEffect } from 'react';
import { deleteuserblog, getPostByUser } from '@/redux/actions/postAction';

const formattedDate = (DateString)=>{
  const options = {year:"numeric", month:"long", day:"numeric"}
  return new Date(DateString).toLocaleDateString(undefined,options)
}
export function BlogSection() {
  const navigate = useNavigate()
  const diaspatch = useDispatch();
  const { userblog, } = useSelector((state)=>state.post)
  useEffect(()=>{
    diaspatch(getPostByUser())
  },[])


  return (
    <div >
      <div className='flex justify-between'>
      <div>
         <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">All Blog Posts</h2>
        <p className="text-sm text-gray-600">Sharing thoughts on development, design, and creativity</p>
      </motion.div>
      </div>
     
      <div>
        <Button className='bg-blue-600'><Link to='/profile/blog/addblog'>Add New Blog</Link></Button>
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.isArray(userblog) && userblog.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
              <div onClick={()=>navigate(`/blog/${post._id}`)} className="aspect-video overflow-hidden">
                <img
                  src={post.coverImage.secure_url}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
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
                <div className='mt-5'>
                  <button className='text-xs text-white border border-gray-500 px-2 py-1 rounded-lg bg-black' onClick={()=>navigate(`/profile/blog/editblog/${post._id}`)}>edit</button>
                  <button className='text-xs text-white border border-gray-500 px-2 py-1 rounded-lg bg-black ml-3' onClick={()=>diaspatch(deleteuserblog(post._id))}>delete</button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
