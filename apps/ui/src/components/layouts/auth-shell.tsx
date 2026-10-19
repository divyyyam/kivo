import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AuthShellProps } from './types'
import { content } from '../content'
const AuthShell = ({
    children,
    mode
}:AuthShellProps) => {

  const copy = content[mode]
  return (
    <main className={cn(
        "min-h-svh"
    )}>
      
    </main>
  )
}

export default AuthShell
