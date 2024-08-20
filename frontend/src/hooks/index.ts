import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";


export const useBlogs=()=>{
    const [loading, setLoading]=useState(false);
    const [blogs, setBlogs]=useState<any>([]);
    const token=localStorage.getItem("token");
    const headers={
        "Authorization":`Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    useEffect(()=>{
        async function main(){
            const res =await  axios.get(`${BACKEND_URL}/blog/bulk/`, {
                headers
            });
            setBlogs(res.data.posts);
            if(res.data.posts){
                setLoading(true);
            }
        }
        main()
    },[])
    return {
        loading, blogs
    };
}

export const useBlog=({id}:{id: string})=>{
    const [loading , setLoading]=useState(false);
    const [blog, setBlog]=useState<any>();
    const token=localStorage.getItem("token");
    const headers={
        "Authorization":`Bearer ${token}`,
        'Content-Type':'application/json',
    };
    useEffect(()=>{
        async function main(){
            const res=await axios.get(`${BACKEND_URL}/blog/${id}`, {
                headers,
            });
            setBlog(res.data.post);
            console.log(blog);
            if(res.data.post){
                setLoading(true);
            }
        }
        main();
    },[id]);
    return {
        loading,
        blog
    }
}