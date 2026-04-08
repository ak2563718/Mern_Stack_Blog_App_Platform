import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, updatepostbyId } from '@/redux/actions/postAction';
import { Progress } from '../ui/progress';

export default function EditBlog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog } = useSelector((state) => state.post);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [secureurl, setSecureUrl] = useState('');
  const [publicId, setPublicId] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    summary: '',
    category: '',
    image: null,
    imagePreview: '',
  });

  // Fetch blog
  useEffect(() => {
    dispatch(getPostById(id));
  }, [id]);

  // Set data
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        content: blog.content || '',
        summary: blog.summary || '',
        category: blog.category || '',
        image: null,
        imagePreview: blog.coverImage?.secure_url || '',
      });

      setSecureUrl(blog.coverImage?.secure_url || '');
      setPublicId(blog.coverImage?.public_id || '');
    }
  }, [blog]);

  // Slug auto generate
  useEffect(() => {
    if (formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Only preview here (NO upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // 🔥 MAIN SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedUrl = secureurl;
    let uploadedPublicId = publicId;

    // Upload only if new image selected
    if (formData.image) {
      setUploading(true);
      setUploadProgress(0);

      const fileData = new FormData();
      fileData.append('file', formData.image);
      fileData.append('upload_preset', 'akashconfig');

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percent);
        }
      });

      await new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            uploadedUrl = res.secure_url;
            uploadedPublicId = res.public_id;
            setUploading(false);
            resolve();
          } else {
            reject('Upload failed');
          }
        };

        xhr.onerror = () => reject('Upload error');

        xhr.open(
          'POST',
          'https://api.cloudinary.com/v1_1/dho81wfoz/image/upload'
        );

        xhr.send(fileData);
      });
    }

    const finaldata = {
      title: formData.title,
      slug: formData.slug,
      summary: formData.summary,
      category: formData.category,
      content: formData.content,
      secure_url: uploadedUrl,
      public_id: uploadedPublicId,
    };

    dispatch(updatepostbyId({ id, updatedata: finaldata }));

    alert('Blog Updated Successfully!');
    navigate('/profile/blog');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-6">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 border rounded-lg"
          required
        />

        {/* Slug */}
        <input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">Select Category</option>
           <option value="Technology">Technology</option>
           <option value="Education & Learning">Education & Learning</option>
           <option value="LifeStyle">LifeStyle</option>
           <option value="Travel">Travel</option>
           <option value="Food Cooking">Food Cooking</option>
           <option value="Science">Science</option>
           <option value="Finance & Money">Finance & Money</option>
           <option value="Creative & Arts">Creative & Arts</option>
           <option value="Politics & Society">Politics & Society</option>
        </select>

        {/* Summary */}
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        {/* Content */}
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg h-40"
          required
        />

        {/* Image Upload */}
        <div className="space-y-4">
          <label className="block font-medium">Featured Image</label>

          <label className="flex items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50">
            <span>
              {formData.image ? formData.image.name : 'Upload Image'}
            </span>

            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* Preview */}
          {formData.imagePreview && (
            <div className="w-48 h-48 border rounded-xl overflow-hidden">
              <img
                src={formData.imagePreview}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Progress */}
          {uploading && (
            <div className="w-48 space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-gray-500">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Update Post
          </button>

          <button
            type="button"
            onClick={() => navigate('/profile/blog')}
            className="px-6 py-3 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}