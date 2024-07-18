// src/configs/froala.config.ts

// import { clientInstance } from '~/services/axios'
// import blogEndpoint from '~/services/axios/endpoints/blog.endpoint'

interface FroalaEvents {
  'image.beforeUpload': (images: any) => void
  // 'image.uploaded': (response: string) => boolean;
  'image.inserted': ($img: [HTMLImageElement], response: any) => void
  'image.replaced': ($img: any, response: any) => void
  'image.error': (error: any, response: any) => void
}

function generateFroalaConfig() {
  const events: FroalaEvents = {
    'image.beforeUpload': function (images) {
      console.log('Before Upload: ', images)
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
    'image.inserted': function ($img, response) {
      console.log('Inserted: ', $img, response)
    },
    'image.replaced': function ($img, response) {
      console.log('Replaced: ', $img, response)
    },
    'image.error': function (error, response) {
      console.log('Error: ', error, response)
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
