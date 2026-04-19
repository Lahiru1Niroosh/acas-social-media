import {useState} from "react"
import TerminalLoader from "./TerminalLoader"
import FinalVerdict from "./FinalVerdict"
import AgentBreakdown from "./AgentBreakdown"
import PrivacyBanner from "./PrivacyBanner"

export default function VerifyPopup({result,loading,onClose}){

const [details,setDetails]=useState(false)

return(

<div className="fixed inset-0 bg-black/50 flex items-center justify-center">

<div className="bg-white w-[600px] rounded-2xl p-6 space-y-6">

<button
onClick={onClose}
className="float-right"
>
✕
</button>

{loading
? <TerminalLoader/>
:(
<>

<PrivacyBanner user={result.user}/>

{!details &&

<FinalVerdict
result={result}
onMore={()=>setDetails(true)}
/>

}

{details &&
<AgentBreakdown result={result}/>
}

</>

)}

</div>

</div>

)

}