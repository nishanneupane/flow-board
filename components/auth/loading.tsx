"use client"
import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-ful h-full flex flex-col justify-center items-center'>
        <Image
        src={"/logo.png"}
        alt='Logo'
        width={120}
        height={120}
        className='animate-pulse duration-700'
        />
    </div>
  )
}

export default Loading