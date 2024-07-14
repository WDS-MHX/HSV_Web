'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const Editor: React.FC = () => {
  const [editorHtml, setEditorHtml] = useState<string>('')

  useEffect(() => {
    const Quill = require('react-quill').Quill
    const ImageResize = require('quill-image-resize-module-react')
    const ImageDrop = require('quill-image-drop-module')

    Quill.register('modules/imageResize', ImageResize)
    Quill.register('modules/imageDrop', ImageDrop)
  }, [])

  const modules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        [{ align: [] }],
        ['clean'],
      ],
      imageResize: {
        modules: ['Resize', 'DisplaySize'],
      },
      imageDrop: true,
    },
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
  ]

  const handleChange = (html: string) => {
    setEditorHtml(html)
  }

  return (
    <div className='p-4 h-full'>
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme='snow'
        style={{ color: 'black', height: '100%' }}
      />
    </div>
  )
}

export default Editor
