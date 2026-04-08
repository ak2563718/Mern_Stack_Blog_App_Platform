
import { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, updateProfile } from '@/redux/actions/profileAction';
import { clearOpenonce } from '@/redux/slices/userSlices';
import Loader from '@/Components/UserComponent/Loader';

export default function AddProfile({isEdit, onEditClose}) {
  const dispatch = useDispatch()
  const { loading, profile } = useSelector((state)=>state.profile)
  const { user } = useSelector((state)=>state.user)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    bio: '',
    domain:[],
  });

  useEffect(()=>{
        if(user){
            setFormData({
                name:user.name,
                location:'',
                bio:'',
                domain:[],
            })
        }
  },[user])

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
    "w-full bg-transparent border-b border-border focus:outline-none focus:border-primary py-1";

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
        ? prev.domain.filter((d) => d !== domain) // remove
        : [...prev.domain, domain],              // add
    };
  });
};
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Profile submitted:', formData);
   await dispatch(createProfile(formData))
   await alert("profile created Successfully")
    dispatch(clearOpenonce())
  };

  useEffect(()=>{
    if(isEdit){
      setFormData({
        name:profile.name,
        location:profile.location,
        bio:profile.bio,
        domain:profile.domain,
      })
    }
  },[isEdit])

  const updateprofile = ()=>{
     dispatch(updateProfile(formData))
      alert("profile updated successfully")
    onEditClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full">
        {loading && <Loader/>}
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl">{isEdit ?"Edit Profile Details": "Add Profile Details"}</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Name */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-sm text-foreground">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter your name"
              readOnly
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-sm text-foreground">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Enter your location"
             
            />
          </div>

          {/* Bio */}
          <div className="flex items-start gap-4">
            <label className="w-28 text-sm text-foreground mt-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={2}
              className={`${inputStyle} resize-none`}
              placeholder="Tell us about yourself"
           
            />
          </div>

          {/* Domain */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-sm text-foreground">Domain</label>
            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              className={inputStyle}
              placeholder="Select or enter your domain"
            
            />
          </div>

          {/* Domain Quick Select */}
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Quick select:
            </p>
            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <button
                  key={domain}
                  type="button"
                  onClick={() => handleDomainClick(domain)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border transition-all ${
                    formData.domain === domain 
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
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
              type={isEdit ? "button":"submit"}
              onClick={isEdit ? updateprofile : null}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={onEditClose}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

