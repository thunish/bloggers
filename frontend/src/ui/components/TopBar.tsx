import {Link} from "react-router-dom"
import logo from "../../../public/logo.png"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { userName } from "../../atoms/atom"
import { useState } from "react";


export const TopBar=()=>{
    const theUserTag=useRecoilValue(userName);
    const [dropdown, setDropdown]=useState(false);
    const navigate=useNavigate();
        return (
        <div className=" fixed top-0 z-10 flex w-full justify-between md:px-8 shadow-xl mt-0 bg-white mb-4 py-2">
            <Link to={'/blogs'}>
                <div> <img className=" h-20 flex justify-start  items-start" src={logo} alt="" /></div>
            </Link>
            
            <div className=" flex flex-row gap-4">
                <div className="flex justify-center flex-col">
                    <button className="bg-slate-300 hover:bg-slate-400 rounded-md px-4 py-2" onClick={()=>{
                        navigate("/new-story")
                    }}>Write +</button>
                </div>
                <div className="flex justify-center flex-col ">
                    <button className="bg-slate-300 hover:bg-slate-400 rounded-md px-4 py-2" onClick={()=>{
                        navigate("/blogs")
                    }}>My Stories</button>
                </div>
                <div className=" flex justify-center flex-col">
                    <div className=" cursor-pointer relative inline-flex items-center justify-center w-14 h-14 overflow-hidden  rounded-full bg-gray-600">
                        <span className="font-semibold  text-gray-100 text-xl" onClick={()=>{
                            setDropdown(!dropdown);
                        }}>{theUserTag}</span>
                    </div>
                    
                </div>
            </div>
            {dropdown && (
            <div className="flex flex-col justify-center items-center">
                <button onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/signin");
                }} className=" bg-red-400 hover:bg-red-600 px-6 py-2 rounded-xl">Logout</button>
            </div>
        )}
        </div>
        
    )
}