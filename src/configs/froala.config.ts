// src/configs/froala.config.ts

import { fileApi } from '@/apis'
import React, { Dispatch, MutableRefObject, Ref, SetStateAction } from 'react'
import { imgContent } from '@/models/post'

// import { clientInstance } from '~/services/axios'
// import blogEndpoint from '~/services/axios/endpoints/blog.endpoint'
type FroalaEditorInstance = any
export interface FroalaEvents {
  initialized: any
  'image.beforeUpload': (images: FileList) => Promise<void>
  // 'image.uploaded': (response: string) => boolean;
  'image.inserted': ($img: any, response: any) => void
  'image.replaced': ($img: any, response: any) => void
  'image.error': (error: any, response: any) => void
  'image.beforeRemove': ($img: any, editor: any) => Promise<boolean | undefined>
  'image.removed': ($img: any, response: any) => void
}
let idImageGlobal: string = 'Froala'
let imageUploadPromise: Promise<void> | undefined
let imageRemovePromise: Promise<boolean> | undefined
function generateFroalaConfig(
  setContentImageIds: React.Dispatch<React.SetStateAction<imgContent[]>>,
  contentImageIds: imgContent[],
  setIdImageRemoved: React.Dispatch<React.SetStateAction<string | undefined>>,
  setCheckExistImage?: React.Dispatch<React.SetStateAction<string | undefined>>,
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleteConfirmed?: React.Dispatch<React.SetStateAction<((confirm: boolean) => void) | null>>,
  editorRef?: MutableRefObject<FroalaEditorInstance | null>,
) {
  let events: FroalaEvents = {
    initialized: function () {
      if (editorRef) {
        editorRef.current = this // Gán instance của Froala editor vào editorRef
      }
    },
    'image.beforeUpload': async function (images) {
      imageUploadPromise = new Promise(async (resolve, reject) => {
        try {
          let res = await fileApi.uploadImage(images)
          if (res) {
            idImageGlobal = res
            resolve()
          }
        } catch (error) {
          reject(error)
        }
      })
      return imageUploadPromise
    },
    // 'image.uploaded': function(response) {
    //     console.log('response: ', response)
    //     const json = JSON.parse(response)
    //     const imgUrl = json.picture_url
    //     this['image'].insert(
    //         imgUrl,
    //         false,
    //         { style: '' },
    //         this['image'].get(),
    //         response,
    //     )
    //     return false
    // },
    'image.inserted': async function ($img, response) {
      try {
        if (imageUploadPromise) {
          await imageUploadPromise
        }
        let url: string = $img[0].currentSrc
        let parts: string[] = url.split('/')
        let idUrl: string = parts.pop() || ''

        let apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
        let modifiedUrl = `${apiBaseUrl}/file/download/${idImageGlobal}`
        $img.attr('src', modifiedUrl)

        if (!!idImageGlobal && !!idUrl) {
          let obj = {
            id: idImageGlobal,
            contentId: idUrl,
          }
          setContentImageIds((prevIds) => [...prevIds, obj])
        }
      } catch (error) {}
    },
    'image.replaced': function ($img, response) {},
    'image.error': function (error, response) {},
    'image.beforeRemove': async function ($img, editor) {
      if (setCheckExistImage && setOpenDialog && setDeleteConfirmed) {
        if (imageUploadPromise) {
          await imageUploadPromise
        }
        imageRemovePromise = new Promise((resolve, reject) => {
          try {
            setOpenDialog(true)
            setDeleteConfirmed(() => (confirm: any) => {
              if (confirm) {
                resolve(confirm)
              } else {
                resolve(confirm)
              }
            })
          } catch (error) {
            reject()
          }
        })
        return imageRemovePromise
      }
    },
    'image.removed': async function ($img, response) {
      try {
        if (imageUploadPromise) {
          await imageUploadPromise
        }
        if (imageRemovePromise) {
          await imageRemovePromise
        }
        let confirmResult = await imageRemovePromise
        let idRemove = undefined
        let url: string = $img[0].currentSrc
        let parts: string[] = url.split('/')
        let idUrl: string = parts.pop() || ''
        setContentImageIds((prev) => {
          let tempArr = prev
          let itemRemove = prev.find((item) => item.id === idUrl)
          idRemove = itemRemove ? itemRemove.id : undefined
          if (setCheckExistImage && setOpenDialog) {
            if (confirmResult) {
              setCheckExistImage(idUrl)
              return (tempArr = prev.filter((item) => item.id !== idUrl))
            } else {
              return tempArr
            }
          }
          setIdImageRemoved(idRemove)
          return (tempArr = prev.filter((item) => item.id !== idUrl))
        })
      } catch (error) {}
      // let idRemove = itemRemove ? itemRemove.contentId : undefined
      // console.log("IDREMOVE",idRemove)
      // if (idRemove) {
      //   try {
      //     console.log("VAOREMOVE")
      //     await fileApi.removeImage(idRemove)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
    },
  }

  return {
    placeholderText: 'Edit Your Content Here!',
    toolbarButtons: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      '|',
      'fontFamily',
      'fontSize',
      'color',
      '|',
      'paragraphFormat',
      'paragraphStyle',
      '|',
      'align',
      'formatOL',
      'formatUL',
      'outdent',
      'indent',
      '|',
      'insertLink',
      'insertImage',
      '|',
      'undo',
      'redo',
      'clearFormatting',
      'selectAll',
    ],
    toolbarSticky: true,
    theme: 'gray',
    heightMin: 300,
    heightMax: 600,
    // Comment out the following lines if endpoints are not yet available
    /*
        imageUploadParam: 'image',
        imageUploadURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}${blogEndpoint['upload-picture']}`,
        requestHeaders: {
            Authorization: `${clientInstance.getAccessToken()}`,
        },
        imageUploadMethod: 'POST',
        */
    imageMaxSize: 0.5 * 1024 * 1024,
    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'webp'],
    events,
    quickInsertTags: [],
  }
}

export default generateFroalaConfig
