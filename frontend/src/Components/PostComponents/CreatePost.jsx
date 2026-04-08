import React, { useState, useEffect } from 'react';
import { Image, Type, Link, AlignLeft, FileText, Send, X, Camera } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createpost } from '@/redux/actions/postAction';

export default function CreatePost({ onSubmit, onCancel }) {
    const dispatch=useDispatch()
    const {postmessage,posterror,post}=useSelector((state)=>state.post)
    const [imageurl,setImageurl]=useState('')
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    summary: '',
    coverimage:null,
  });

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
  const handleSubmit=(e)=>{
    e.preventDefault();
    const data=new FormData()
    data.append('title',formData.title)
    data.append('slug',formData.slug)
    data.append('content',formData.content)
    data.append('summary',formData.summary)
    data.append('coverimage',formData.coverimage)
    dispatch(createpost(formData))

    setImageurl('')
  }



  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Create New Post</h2>
          <p className="text-slate-500 text-sm">Fill in the details to publish your content.</p>
        </div>
        <button 
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Title & Slug Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <Type size={16} className="text-blue-500" />
              Title
            </label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <Link size={16} className="text-blue-500" />
              Slug
            </label>
            <input
              required
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="post-url-slug"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-500 font-mono text-sm"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <AlignLeft size={16} className="text-blue-500" />
            Summary
          </label>
          <textarea
            required
            name="summary"
            rows="5"
            value={formData.summary}
            onChange={handleChange}
            placeholder="A short description of your post..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none placeholder:text-slate-400"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <FileText size={16} className="text-blue-500" />
            Content
          </label>
          <textarea
            required
            name="content"
            rows="10"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your story here..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-y placeholder:text-slate-400"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <Image size={16} className="text-blue-500" />
            Featured Image URL
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                required
                type="file"
                name="coverimage"
                onChange={handlefile}
                accept="image/*"
                placeholder="https://images.unsplash.com/..."
                className="w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            {imageurl && (
              <div className="w-50 h-50 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 relative right-50">
                <img src={imageurl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-2 py-4 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Send size={18} />
            Publish Post
          </button>
        </div>
        {(postmessage || posterror) && <p className="text-center text-sm text-red-500 bg-red-50 py-2 px-4 rounded-lg">{(postmessage || posterror)}</p>}
      </form>
    </div>
  );
}
