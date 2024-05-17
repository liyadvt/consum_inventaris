import React from 'react'

export default function Card(props) {
  return (
    <div className='bg-gray-900 flex items-center justify-center'>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg p-6">
            <h4 className='text-white text-2xl'>{props.title}</h4>
            <p className='text-lg text-gray-400 leading-relaxed'>{props.desc}</p>
        </div>
    </div>
  )
}
