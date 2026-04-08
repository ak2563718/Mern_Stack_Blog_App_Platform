import React, { useState, useEffect } from 'react';
import { Image, Type, Link, AlignLeft, FileText, Send, X, Upload , Image as ImageIcon} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createpost } from '@/redux/actions/postAction';
import { Progress } from '../ui/progress';
import { Select , SelectTrigger , SelectValue , SelectContent ,SelectItem } from '../ui/select';
import { clearpostmessages } from '@/redux/slices/postSlices';
import Loader from '../UserComponent/Loader';
import { useNavigate } from 'react-router-dom';


export default function AddBlog() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [secure_url, setSecure_url] = useState('');
  const [public_id, setPublic_id] = useState('');
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const {postmessage, posterror, post, postloading }=useSelector((state)=>state.post)
    const [imageurl,setImageurl]=useState('')
    const [formData, setFormData] = useState({
      title: '',
      slug: '',
      content: '',
      summary: '',
      category:'',
      coverimage:null,
    });

  useEffect(()=>{
    window.scrollTo(0,0)
    dispatch(clearpostmessages())
  },[])

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title]);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handlefile=(e)=>{
    const file=e.target.files[0]
    setFormData((prev)=>({...prev,coverimage:file}))
    const previewURL = URL.createObjectURL(file);
    setImageurl(previewURL);
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.coverimage) return;

  setUploading(true);
  setUploadProgress(0);

  const fileData = new FormData();
  fileData.append("file", formData.coverimage);
  fileData.append("upload_preset", "akashconfig");

  const xhr = new XMLHttpRequest();

  // Progress tracking
  xhr.upload.addEventListener("progress", (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      setUploadProgress(percent);
    }
  });

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      const postData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        summary: formData.summary,
        category: formData.category,
        secure_url: response.secure_url,
        public_id: response.public_id,
      };

      dispatch(createpost(postData)); // ✅ AFTER upload

      setUploading(false);
    } else {
      console.error("Upload failed");
      setUploading(false);
    }
  };

  xhr.onerror = () => {
    console.error("Upload error");
    setUploading(false);
  };

  xhr.open(
    "POST",
    "https://api.cloudinary.com/v1_1/dho81wfoz/image/upload"
  );

  xhr.send(fileData); // ✅ CORRECT
};


  useEffect(()=>{
    if(postmessage){
      setFormData({
        title: '',
        slug: '',
        content: '',
        summary: '',
        category:'',
        coverimage:null,
      })
     
      navigate('/profile/blog')
    }
  },[postmessage])

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      { postloading && <Loader />}
      <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between mt-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Create New Post</h2>
          <p className="text-slate-500 text-sm">Fill in the details to publish your content.</p>
        </div>
        <button 
          onClick={()=>navigate('/profile/blog')}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-all"
        >
          <X size={24} />
        </button>
      </div>
 
      <form onSubmit={handleSubmit} className="p-8 space-y-3 mb-10">
        {/* Title & Slug Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <Type size={12} className="text-blue-500" />
              Title
            </label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title..."
              className="w-full h-[40px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <Link size={12} className="text-blue-500" />
              Slug
            </label>
            <input
              required
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="post-url-slug"
              className="w-full h-[40px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-500 font-mono text-sm"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <AlignLeft size={12} className="text-blue-500" />
            Summary
          </label>
          <textarea
            required
            name="summary"
            rows="10"
            value={formData.summary}
            onChange={handleChange}
            placeholder="A short description of your post..."
            className="w-full h-[80px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none placeholder:text-slate-400"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <FileText size={12} className="text-blue-500" />
            Content
          </label>
          <textarea
            required
            name="content"
            rows="20"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your story here..."
            className="w-full h-[150px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-y placeholder:text-slate-400"
          />
        </div>

      {/* Category */}
        <div className="space-y-2">
               <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <AlignLeft size={12} className="text-blue-500" />
                Category
              </label>
              
                <Select
                  name='category'
                  value={formData.category}
                  onValueChange={(value)=> setFormData({...formData,category:value})}
                  required
                >
                  <SelectTrigger >
                    <SelectValue placeholder="Select Category" className='w-full h-[150px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-y placeholder:text-slate-400' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Education & Learning">Education & Learning</SelectItem>
                    <SelectItem value="LifeStyle">LifeStyle</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Food Cooking">Food Cooking</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Finance & Money">Finance & Money</SelectItem>
                    <SelectItem value="Creative & Arts">Creative & Arts</SelectItem>
                    <SelectItem value="Politics & Society">Politics & Society</SelectItem>
                  </SelectContent>
                </Select>
              </div>


        {/* Image URL */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <Image size={12} className="text-blue-500" />
            Featured Image URL
          </label>
          <div className="flex gap-4">
          <div className="flex-1">
            <label className="flex items-center justify-center gap-2 w-full h-[60px] px-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all">

              <ImageIcon className="h-5 w-5 text-slate-500" />

              <span className="text-sm text-slate-600">
                Upload Cover Image
              </span>

              <input
                type="file"
                name="coverimage"
                accept="image/*"
                onChange={handlefile}
                className="hidden"
                required
              />
            </label>
            </div>
        <div className="flex flex-col gap-4 w-full">
  
            {/* Image Preview */}
            {imageurl && (
              <div className="w-full max-w-xs h-48 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src={imageurl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Upload Progress */}
            {uploading && (
              <div className="w-full max-w-xs space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-center text-slate-500">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

          </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={()=>navigate('/profile')}
            className="flex-1 py-4 h-[50px] px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-2 py-4 px-10 h-[50px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Send size={14} />
            Publish Post
          </button>
        </div>
        {(postmessage || posterror) && <p className="text-center  text-sm text-red-500 bg-red-50 py-2 px-4 rounded-lg">{(postmessage || posterror)}</p>}
      </form>
    </div>
  );
}
