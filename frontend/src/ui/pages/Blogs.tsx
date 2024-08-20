import { EachBlog } from "../components/EachBlog";
import { useBlogs } from "../../hooks";
import { Loader } from "../components/Loader";
import moment from "moment"
import { TopBar } from "../components/TopBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const Blogs=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        
        if(!localStorage.getItem("token")){
            navigate("/signin")
        }
    })
    const {loading, blogs}=useBlogs();
    console.log(blogs, "thuni");
    if(!loading){
        return (
            <Loader></Loader>
        )
    }
    
    return(
        <div className=" flex justify-center flex-col ">
            <TopBar></TopBar>
            <div className=" flex w-full justify-center mt-24">
                <div className="  flex justify-center flex-col items-center w-full">
                    {blogs.map((each: any)=>{
                        return (
                            <div key={each.id} className=" lg:w-9/12 w-10/12" >
                                <EachBlog 
                                    authorName={`${each.author.firstName} ${each.author.lastName}`} 
                                    publishDate={moment(each.createdAt).format('MMM DD YYYY')} 
                                    title={each.title} 
                                    content={each.content} 
                                    url={each.imageUrl} 
                                    id={each.id}>
                                </EachBlog>
                            </div>
                        )
                    })}                 
                </div>
            </div>
        </div>
    )
}