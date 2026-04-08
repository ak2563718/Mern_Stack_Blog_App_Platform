import React, { useState } from "react";
import axios from "axios";

function Uploadimage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select an image");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "akashconfig");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dho81wfoz/image/upload",
        data,
      );
      setImageUrl(res.data.secure_url);
      setUploading(false);
      setProgress(0);
    } catch (err) {
      setError("Upload failed");
      setUploading(false);
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 border rounded-lg shadow"
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 rounded"
          accept="image/*"
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-40 h-40 object-cover rounded"
          />
        )}

        {/* Progress */}
        {uploading && (
          <div className="w-full bg-gray-200 rounded h-3">
            <div
              className="bg-blue-500 h-3 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="bg-gray-700 text-white py-2 rounded"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {/* Error */}
        {error && <p className="text-red-500">{error}</p>}
      </form>

      {/* Uploaded Image */}
      {imageUrl && (
        <div className="text-center">
          <p className="text-green-600">Uploaded Successfully 🎉</p>
          <img
            src={imageUrl}
            alt="uploaded"
            className="w-40 h-40 object-cover rounded mt-2"
          />
          <p className="text-sm mt-2 break-all">{imageUrl}</p>
        </div>
      )}
    </div>
  );
}

export default Uploadimage;