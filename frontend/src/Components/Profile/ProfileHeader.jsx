import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Edit2, X,Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogClose } from '../ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getProfile } from '@/redux/actions/profileAction';
import ProfilePicdemo from './ProfilePicdemo';
import AddProfile from './SideNavItems/AddProfile';
import CreateProfile from './CreateProfile';


export function ProfileHeader() {
  const navigate = useNavigate()
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  

  const dispatch = useDispatch()
  const [Open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [addprofile, setAddprofile] = useState(false)
  const { profile } = useSelector((state)=>state.profile)
  const { user, loading, islogin} = useSelector((state)=>state.user)

  useEffect(()=>{
   dispatch(getProfile())
  },[loading,Open])



  

  return (
    <>
      <section className="bg-white shadow-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture - Left Side on Desktop */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <div 
                className="relative group cursor-pointer z-10"
                onClick={() => setIsImageEnlarged(true)}
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-gray-100 shadow-lg bg-blue-400"
                >
                  <img
                    src={profile.profileImage?.secure_url}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              
            </div>
              <div className='flex  mt-3 ' onClick={()=>setOpen(true)}>
                  <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                   
               </div>
            </motion.div>

            {/* User Details - Right Side on Desktop */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 text-center md:text-left"
            >
              {/* User Name */}
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
              >
                {profile.name || user.name}
              </motion.h1>

              {/* User Location */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center justify-center md:justify-start gap-1.5 mb-4 text-gray-600"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{profile.location || " "}</span>
              </motion.div>

              {/* User Bio */}
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-gray-700 text-sm leading-relaxed mb-4 max-w-2xl"
              >
                {profile.bio || " "}
              </motion.p>

              {/* User Posts/Roles */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-2 justify-center md:justify-start mb-4"
              >
                {Array.isArray(profile.domain) && profile?.domain.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  >
                    <Badge 
                      variant="secondary"
                      className="px-3 py-1 text-xs"
                    >
                      {post}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>

              {/* Edit Profile Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {!profile.name ? (<Button 
                  onClick={()=>setAddprofile(true)}
                  className="gap-2 text-sm"
                  size="default"
                >
                  <Edit2 className="w-4 h-4" />
                  Add Profile
                </Button>): (<Button 
                  onClick={()=>setEdit(true)}
                  className="gap-2 text-sm"
                  size="default"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>)} 
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
  {Open &&  <ProfilePicdemo isOpen={open} onClose={()=>setOpen(false)}  setPreviewImage={setPreviewImage}/> }
  {edit &&  <AddProfile isEdit={edit} onEditClose = {()=>setEdit(false)}/> }
  {addprofile &&  <CreateProfile isAdd={addprofile} onAddClose = {()=>setAddprofile(false)}/> }
      {/* Enlarged Image Dialog */}
      <Dialog open={isImageEnlarged} onOpenChange={setIsImageEnlarged}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-transparent border-0">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors">
            <X className="h-5 w-5" />
          </DialogClose>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full aspect-square"
          >
            <img
              src={profile.profileImage?.secure_url || previewImage}
              alt={profile.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
