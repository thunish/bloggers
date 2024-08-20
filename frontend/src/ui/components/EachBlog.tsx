import { Link } from "react-router-dom"

interface blogCard {
    id:string,
    authorName:string,
    publishDate:string,
    title:string,
    content:string,
    url:string,
}

export const EachBlog=({
    authorName,
    publishDate,
    title,
    content,
    url,
    id
}: blogCard)=>{
    return (
        <Link to={`/blog/${id}`}>
            <div className=" flex flex-col  p-4  items-center border-b-2">
                <div className=" flex md:flex-row flex-col shadow-xl p-8 rounded-xl w-4/5  justify-between ">
                    <div>
                        <div className=" flex flex-row items-center">
                            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-gray-600 mr-1">
                                <span className ="font-medium text-gray-100">{`${authorName[0]}`}</span>
                            </div>
                            <div className=" p-2">{authorName} .</div>
                            <div className=" font-extralight"> {publishDate}</div>
                        </div>
                        <div className=" text-lg font-bold pt-2">
                            {title}
                        </div>
                        <div className=" text-sm font-light pt-2">
                            {content.substring(0, 200)}......
                        </div>
                        <div className=" text-sm font-extralight pt-4">
                            {`${Math.ceil(content.length/100)} min read`}
                        </div>
                    </div>
                    <div className=" flex justify-center flex-col p-2 mt-4">
                        <img className=" rounded-xl md:w-32 md:h-32 " src={`${url}`} alt="" />
                        
                    </div>
                </div>           
            </div>
        </Link>
    )
}