import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { createCroppedImage } from "../utils/cropImage";
import { Button } from "../ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "@/redux/actions/profileAction";
import Loader from "../UserComponent/Loader";

function ProfilePicdemo({ isOpen, onClose, setPreviewImage }) {
  const dispatch = useDispatch()
  const { loading } = useSelector((state)=>state.profile)
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const fileInputRef = useRef(null);

  // ✅ crop complete
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // ✅ file select
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ save cropped image
  const handleSaveChanges = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImg = await createCroppedImage(
        imageSrc,
        croppedAreaPixels,
        0
      );
      
      setPreviewImage(croppedImg);
      const data = new FormData();
      data.append('file',croppedImg);
      data.append('upload_preset','akashconfig');
      const res = await axios.post('https://api.cloudinary.com/v1_1/dho81wfoz/image/upload',data);
      dispatch(updateProfile({secure_url:res.data.secure_url , public_id:res.data.public_id}))
      handleClose(); // 🔥 always use this
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  // ✅ FULL CLOSE HANDLER (IMPORTANT)
  const handleClose = () => {
    // reset everything
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onClose(); // close parent
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose(); // 🔥 FIXED
      }}
    >
      <DialogContent className="max-w-md">
        
        <DialogHeader className="relative">
          <DialogTitle>Edit Profile Picture</DialogTitle>
        </DialogHeader>
        {loading && <Loader/>}
        <div className="space-y-4">

          {/* STEP 1: Upload */}
          {!imageSrc ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center border-gray-300 hover:border-blue-400 transition">
              
              <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
            </div>
          ) : (
            <>
              {/* STEP 2: Crop */}
              <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleClose}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>

                <Button onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            </>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProfilePicdemo;