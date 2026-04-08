import React, { useState } from "react";
import axios from "axios";

function ProgressBar() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!file) return;
        const data = new FormData();
        data.append('file',file)
        data.append('upload_preset','akashconfig')
         const res = await axios.post('https://api.cloudinary.com/v1_1/d12321ho81wfoz/image/upload',data,{
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        })
  };

  return (
    <div  style={{ width: "300px", margin: "50px auto" ,marginTop:"100px"}}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={handleUpload}>Upload</button>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#ddd",
          marginTop: "10px",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "green",
            borderRadius: "5px",
            transition: "0.3s",
          }}
        ></div>
      </div>

      <p>{progress}%</p>
    </div>
  );
}

export default ProgressBar;