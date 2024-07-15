import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { MdOutlineFileUpload } from 'react-icons/md'
import { Inter } from 'next/font/google'
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export default function InputFileUpload() {
  return (
    <Button
      sx={{
        backgroundColor: '#0284C7',
        fontSize: 14,
        fontFamily: 'Inter',
        textTransform: 'none',
        fontWeight: 500,
        paddingBlock: '8px',
        textWrap: 'nowrap',
      }}
      component='label'
      role={undefined}
      variant='contained'
      tabIndex={-1}
      startIcon={<MdOutlineFileUpload className='font-bold' />}
    >
      Upload tài liệu
      <VisuallyHiddenInput type='file' />
    </Button>
  )
}
