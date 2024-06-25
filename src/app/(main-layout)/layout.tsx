import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className='content'>{children}</div>
    </div>
  )
}

export default layout
