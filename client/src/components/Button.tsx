import React from 'react'
import './Button.css'

import { Link } from 'react-router-dom'

interface ButtonProps {
  path: string,
  message: string
}

export const Button: React.FC<ButtonProps> = ({ path, message }) => {
  return (
    <Link to={path}>
        <div className='button'>
            <div className='button-content'>
                <h3>{message}</h3>
            </div>
        </div>
    </Link>
  )
}
