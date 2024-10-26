import React from 'react'
import { ragChat } from '../lib/rag-chat'
import { url } from 'inspector'
import { redis } from '../lib/redis'

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

    const isAlreadyIndexed = await redis.sismember("indexed-urls",reconstructedUrl);
  
    if(!isAlreadyIndexed){

    await ragChat.context.add({
            type:"html",
            source:reconstructedUrl,
            config:{chunkOverlap:50,chunkSize:200}
        })
      await redis.sadd("indexed-urls",reconstructedUrl);
    }
    
  return (
    <div>Page</div>
  )
}

export default Page