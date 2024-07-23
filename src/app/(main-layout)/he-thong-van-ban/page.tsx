import DocumentsTable from '@/components/shared/DocumentsTable'
import { documents } from './data'
export default function hethongvanban() {
  return (
    <div className='my-4'>
      <DocumentsTable documents={documents}></DocumentsTable>
    </div>
  )
}
