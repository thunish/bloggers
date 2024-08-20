import { useBlog } from "../../hooks"
import { FullBlog } from "../components/FullBlog";
import { Loader } from "../components/Loader";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Blog=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem("token");
        console.log("token");
        if(!localStorage.getItem("token")){
            navigate("/signin")
        }
    })
    const { id }=useParams();
    const {loading, blog}=useBlog({id: id || ""});
    console.log(blog);
    console.log(blog);
    if(!loading){
        return (
            <div>
                <Loader></Loader>
            </div>
        )
    }

    return (
        <div>
            <FullBlog content={blog.content} title={blog.title} publishedDate={moment(blog.createdAt).format("MMM DD YYYY")} imageUrl={blog.imageUrl}></FullBlog> 
        </div>
    )
}