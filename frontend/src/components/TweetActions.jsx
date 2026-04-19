export default function TweetActions({likes,comments}){

return(

<div className="flex gap-6 text-gray-500 text-sm mt-3">

<span className="flex items-center gap-1">
❤️ {likes}
</span>

<span className="flex items-center gap-1">
💬 {comments}
</span>

<span className="flex items-center gap-1">
🔁
</span>

<span className="flex items-center gap-1">
🔗
</span>

</div>

)

}