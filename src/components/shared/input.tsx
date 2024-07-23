'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className='w-full flex items-center relative'>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          className={cn(
            'flex h-10 font-normal w-full rounded-md border-[1.5px] border-slate-300 bg-white px-4 py-2 text-[1rem] file:border-0 file:bg-transparent file:text-sm file:font-normal placeholder:text-placeHolder placeholder:font-normal focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50',
            className,
            type === 'password' && 'pr-12',
          )}
          spellCheck={false}
          ref={ref}
          {...props}
        />

        {type === 'password' && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute text-cool-gray-60 right-4'
          >
            {showPassword ? <EyeIcon className='h-4' /> : <EyeOffIcon className='h-4' />}
          </button>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
import { InputHTMLAttributes, forwardRef, useState } from 'react'
