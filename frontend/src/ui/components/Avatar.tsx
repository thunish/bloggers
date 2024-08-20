

export const Avatar=({
    text
}:{
    text:string
})=>{
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-gray-600 mr-1">
            <span className ="font-medium text-gray-100">{text}</span>
        </div>
    )
}