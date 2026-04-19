
export async function verifyTweet(tweet){

  const response = await fetch("http://localhost:8000/verify",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(tweet)
  })

  if(!response.ok){
    throw new Error("Verification failed")
  }

  return await response.json()
}