import { ChangeEvent, useState } from "react"
import { Quote } from "../components/Quote"
import {  Link } from "react-router-dom"
import { SignupBody } from "@thunish/medium-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export const Signup=()=>{
    const navigate=useNavigate();
    const [postInputs, setPostInputs]=useState<SignupBody>({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    });
    const sendReq=async ()=>{
        const response=await axios.post("https://backend.thunishandbobby.workers.dev/api/v1/user/signup", {
            ...postInputs
        });
        const {body}=response.data;
        localStorage.setItem("token", body);
        navigate("/blog/1")
    }
    return(
        <div className=" grid grid-cols-1 lg:grid-cols-2">
            <div className=" flex justify-center items-center flex-col">
                <div className=" bg-slate-700 py-10 rounded-lg shadow-lg text-white px-10">
                    <div className=" px-12 ">
                        <div className=" font-extrabold text-2xl">
                            Create an account
                        </div>
                        <div className=" text-slate-200 pt-4 text-sm">
                            Already have an account? <Link to="/signin">Login</Link>
                        </div>
                    </div>
                    <div className=" mt-6 ">
                        <InputField title="First Name" placeholder="Thunish......" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                firstName:e.target.value
                            })
                        }}></InputField>
                        <InputField title="Last Name" placeholder="Kondabolu......" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                lastName:e.target.value
                            })
                        }}></InputField>
                        <InputField title="Email" placeholder="example@domain.com" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                email:e.target.value
                            })
                        }}></InputField>
                        <InputField title="Password" type="password" placeholder="******" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                password:e.target.value
                            })
                        }}></InputField>
                        <button className=" w-full bg-white text-black mt-5 py-2 rounded-lg hover:bg-slate-200" onClick={()=>{
                            sendReq();
                        }}>
                            Signup
                        </button>
                    </div>
                </div>
            </div>
            <div className=" pt-5 lg:p-0">
                <Quote></Quote>
            </div>
        </div>
    )
}

interface inputField {
    title:string,
    placeholder:string,
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void,
    type?:string,
}
const InputField=({ title, placeholder, onChange, type }: inputField )=>{
    return (
        <div className=" mt-4 w-full    ">
            <div className=" w-full">
                <label  className="block mb-2 text-sm font-medium text-white ">{title}</label>
                <input onChange={onChange} type={type || "text"} id="first_name" className=" border   text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder={placeholder} required />
            </div>
        </div>
    )
}