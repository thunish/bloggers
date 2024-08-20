import { useState } from "react";
import axios from "axios";


export const ImageLoader=({onLinkChange}: {onLinkChange: (link: string)=>void})=>{
  const [image, setImage] = useState<any>();
  const [url, setUrl] = useState("null");
  const handleImageChange = (e: any) => {
    console.log("reached")
    setImage(e.target.files[0]);
  };
  const handleSubmit=async(e: React.FormEvent)=>{
    e.preventDefault();
    if (!image) {  
      return;
    } 
    const formData = new FormData();
    formData.append('file', image);
    setImage(null);
    formData.append('upload_preset', 'bloggerSpot'); // Replace with your upload preset
    formData.append('cloud_name', 'dgjjphrax');
    try {
      console.log("here 2")
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dgjjphrax/image/upload',
        formData
      );
      setUrl(response.data.secure_url);
      onLinkChange(response.data.secure_url);
      alert("image uploaded successfully")
    } catch (err) {
      alert("Problem while uploading image")
      console.error(err);
    }
  }
  return (
    <div>
      <form >
        <div className=" flex flex-col ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload file</label>
            <input onChange={handleImageChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div> 
        <button onClick={handleSubmit}>Upload</button> 

       </form>
    </div>
  );
}