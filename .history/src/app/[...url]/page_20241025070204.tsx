import React from 'react'
import { ragChat } from '../lib/rag-chat'
import { url } from 'inspector'

interface PageProps {
    params:{
        url:string | string[] | undefined
    }
}

function reconstructUrl({url}:{url:string[]}){
  const decodedUrl = url.map(component => decodeURIComponent(component));
  return decodedUrl.join("/");
}

const Page = async({params}: PageProps) => {
    const reconstructedUrl = reconstructUrl({url:params.url as string[]})
  
    await ragChat.context.add({
        type:"html",
        source:reconstructedUrl,
        config:{chunkOverlap:50,chunkSize:200}
    })
    
  return (
    <div>Page</div>
  )
}

export default Page