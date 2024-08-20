import { Avatar } from "./Avatar"
import { TopBar } from "./TopBar"


interface FullBlogProps{
    content:string,
    title:string,
    publishedDate:string,
    imageUrl:string,
}

export const FullBlog=({
    content,
    title,
    publishedDate,
    imageUrl,

}: FullBlogProps)=>{
    return (
        <div className="">
            <TopBar></TopBar>
            <div className=" flex justify-center flex-col ">
                <div className=" grid lg:grid-cols-3 lg:px-24 pt-16 px-8 mt-24 justify-center grid-rows-2 ">
                    <div className=" col-span-2 flex justify-center    flex-col ">
                        <div className=" text-6xl font-bold mb-2">{title}</div>
                        <div className=" text-lg text-slate-400">Posted on {publishedDate}</div>
                        <div className=" mt-6">{content}</div>
                        <div className="">
                            <img src={imageUrl} alt=""  className=" rounded-xl mt-4"/>
                        </div>
                    </div>
                    <div className="">
                        <div className=" col-span-1  pt-4 flex flex-col items-start">
                            <div className=" text-sm font-semibold text-slate-600">Author</div>
                            <div className=" flex gap-4 pt-8">
                                <div className=" flex flex-col justify-center">
                                    <div className="relative inline-flex items-center justify-center w-8 h-8  overflow-hidden rounded-full bg-gray-600 mr-1 mt-2">
                                        <span className ="font-medium text-gray-100">KT</span>
                                    </div>
                                </div>
                                <div>
                                    <div className=" font-bold text-xl">Thunish</div>
                                    <div>A passionate blog writer, open to work in any organisation.</div>
                                    
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}