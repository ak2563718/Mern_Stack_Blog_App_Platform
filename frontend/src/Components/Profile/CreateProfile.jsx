import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile } from '@/redux/actions/profileAction';

export default function CreateProfile({ isAdd, onAddClose }) {
  const dispatch = useDispatch(); 
  const {loading , user } = useSelector((state)=>state.user)
  const { profile } = useSelector((state)=>state.profile)
  const [formData, setFormData] = useState({
    name: user.name,
    location: '',
    bio: '',
    domain: [],
  });


  const domains = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Cybersecurity',
    'Cloud Computing',
  ];

  const inputStyle =
    "w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 py-1";

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDomainClick = (domain) => {
    setFormData((prev) => {
      const exists = prev.domain.includes(domain);

      return {
        ...prev,
        domain: exists
          ? prev.domain.filter((d) => d !== domain)
          : [...prev.domain, domain],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createProfile(formData))

    onAddClose()
  
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl">
           Add Profile Details
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Name */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className={inputStyle}
              readOnly
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-sm">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter location"
            />
          </div>

          {/* Bio */}
          <div className="flex items-start gap-4">
            <label className="w-28 text-sm mt-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={2}
              className={`${inputStyle} resize-none`}
              placeholder="Tell about yourself"
            />
          </div>

          {/* Domains */}
          <div>
            <p className="mb-2 text-sm text-gray-500">Select Domains:</p>

            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <button
                  key={domain}
                  type="button"
                  onClick={() => handleDomainClick(domain)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border ${
                    formData.domain.includes(domain)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save Profile
            </button>

            <button
              type="button"
              onClick={()=>onAddClose()}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}