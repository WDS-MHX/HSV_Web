// src/components/Editor.tsx

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import generateFroalaConfig from '@/configs/froala.config'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/themes/gray.min.css'
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
