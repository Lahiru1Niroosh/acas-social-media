import {useState} from "react"
import FeedLayout from "./components/FeedLayout"
import VerifyPopup from "./components/VerifyPopup"
import {verifyTweet} from "./services/api"

export default function App(){

const [result,setResult]=useState(null)
const [loading,setLoading]=useState(false)
const [verifyingId,setVerifyingId]=useState(null)

const handleVerify=async(tweet)=>{

setLoading(true)
setVerifyingId(tweet.id)

try{

const res=await verifyTweet(tweet)
setResult(res)

}catch(err){

console.error(err)
alert("Backend error")

}

setLoading(false)
setVerifyingId(null)

}

return(

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-3xl font-bold mb-8">
AI Truth Engine
</h1>

<FeedLayout
onVerify={handleVerify}
verifyingId={verifyingId}
/>

{result &&
<VerifyPopup
result={result}
loading={loading}
onClose={()=>setResult(null)}
/>
}

</div>

)

}