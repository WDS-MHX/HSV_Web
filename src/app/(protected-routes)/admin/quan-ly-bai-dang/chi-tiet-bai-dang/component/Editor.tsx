// src/components/Editor.tsx

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import generateFroalaConfig from '@/configs/froala.config'
import '@/styles/froala-custom.css'

// Load Froala Editor dynamically
const FroalaEditorComponent = dynamic(() => import('@/components/shared/FroalaEditorComponent'), {
  ssr: false,
})

const Editor = () => {
  const froalaConfig = useMemo(() => generateFroalaConfig(), [])
  const [content, setContent] = useState<string>('')

  return (
    <FroalaEditorComponent
      tag='textarea'
      config={froalaConfig}
      model={content}
      onModelChange={(e: string) => setContent(e)}
    />
  )
}

export default Editor
