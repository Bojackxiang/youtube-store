import React from 'react'

interface AuthTitleProps {
  children: React.ReactNode
}

const AuthTitle: React.FC<AuthTitleProps> = ({children}) => {
  return (
    <div className='font-bold text-2xl mx-auto text-center'>
      {children}
    </div>
  )
}

export default AuthTitle
