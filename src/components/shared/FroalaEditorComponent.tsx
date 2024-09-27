import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/css/themes/gray.min.css'
import FroalaEditorComponent from 'react-froala-wysiwyg'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('editor')
if (rootElement) {
  const root = createRoot(rootElement) // createRoot is now used in React 18+
  root.render(<FroalaEditorComponent tag='textarea' />)
}
export default FroalaEditorComponent
