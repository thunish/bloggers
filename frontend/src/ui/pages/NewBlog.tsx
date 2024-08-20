import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import logo from "../../../public/logo.png";
import AiBot from "./AI-Bot";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useEffect, useState } from "react";
import { ImageLoader } from "../components/ImageLoader";


export const NewBlog=()=>{
    const [title, setTitle]=useState("");
    const [content, setContent]=useState("");
    const [imageLink, setImageLink]=useState<String>("");
    

    
    
    return (
        <div className="">
            <NavBar title={title} content={content} imageUrl={imageLink}></NavBar>
            <div className=" mt-24 grid grid-cols-12 ">
                <div className="  col-span-12 lg:col-span-8 flex flex-col  h-full mt-4">
                    <div className=" flex flex-row justify-center ">
                        <input onChange={(e)=>{
                            setTitle(e.target.value);
                        }} type="text" placeholder="Write your title here" className=" w-3/4 text-5xl font-semibold h-24 p-4 rounded-lg focus:outline-none "  />
                    </div>
                    <div className=" flex justify-center h-full">
                        <div className="w-3/4 max-w-4xl h-full">
                            <textarea onChange={(e)=>{
                                setContent(e.target.value);
                            }}
                            placeholder="Start writing your story here..."
                            className="w-full  p-6 border  rounded-lg shadow-md resize-none overflow-auto bg-white text-gray-800 focus:outline-none text-lg h-96"
                            />
                        </div>
                    </div>
                    <div className=" flex flex-row justify-center">
                        <div className=" flex flex-col  p-4 w-3/4">
                            <ImageLoader onLinkChange={setImageLink}></ImageLoader>
                        </div>
                    </div>

                </div>
                <div className=" col-span-12 lg:col-span-4">
                    <AiBot></AiBot>
                </div>
            </div>
        </div>
    )
}

export const NavBar=({title, content, imageUrl}:{
    title:string,
    content:string,
    imageUrl:String,
})=>{
    const navigate=useNavigate();
    const userTag=localStorage.getItem("username")
    return (
        <div>
            <div className=" fixed top-0 z-10 flex w-full justify-between md:px-8 shadow-xl mt-0 bg-white mb-4 py-2">
                <Link to={'/blogs'}>
                    <div> <img className=" h-20 flex justify-start  items-start" src={logo} alt="" /></div>
                </Link>
                
                <div className=" flex flex-row gap-4">
                    <div className="flex justify-center flex-col ">
                        <button className="bg-green-400  hover:bg-green-500 rounded-full px-4 py-2" onClick={async()=>{
                            const res=await axios.post(`${BACKEND_URL}/blog`, {
                                title:title,
                                content:content,
                                imageUrl:imageUrl,
                            },{
                                headers:{
                                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                                }
                            });
                            navigate("/blogs")
                        }}>Publish</button>
                        
                    </div>
                    <div className="flex justify-center flex-col ">
                        <button className="bg-slate-300 hover:bg-slate-400 rounded-md px-4 py-2" onClick={()=>{
                            navigate("/blogs")
                        }}>My Stories</button>
                    </div>
                    <div className=" flex justify-center flex-col ">
                        
                        <div className="relative inline-flex items-center justify-center w-14 h-14 overflow-hidden  rounded-full bg-gray-600">
                            <span className="font-semibold  text-gray-100 text-xl">JL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}