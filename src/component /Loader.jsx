import React from 'react'
import { Html } from "@react-three/drei"
const Loader = () => {
  return (
    <Html>
        <div className='flex-center h-full w-full absolute top-0 left-0'>
            <div className='h-[10vw] w-[10vw] rounded-full'>
                Loading...
            </div>
        </div>
    </Html>
  )
}

export default Loader