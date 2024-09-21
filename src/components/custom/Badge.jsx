import React from 'react'

const Badge = ({ text, color }) => {
  return (
    <span
      className={`inline-block text-black px-3 py-1 text-xs font-semibold  rounded-full shadow-md bg-gradient-to-r from-${color}-500 to-${color}-700 mr-2 mb-2`}
    >
      {text}
    </span>
  )
}

export default Badge
