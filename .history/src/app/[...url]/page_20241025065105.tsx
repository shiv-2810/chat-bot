import React from 'react'

interface PageProps {
    params:{
        url:string | string[] | undefined
    }
}

const Page = ({params}: PageProps) => {
    console.log('Params',params);
    
  return (
    <div>Page</div>
  )
}

export default Page