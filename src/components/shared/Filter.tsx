'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Category } from '@/configs/categoryFilters'

export default function Filter({
  data,
  onChange, // can be a setState func, use for change state variable in it's parent
}: {
  data: Category[]
  onChange: any
}) {
  return (
    <Select onValueChange={(v: string) => onChange(v)}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Chọn danh mục' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chọn danh mục</SelectLabel>
          <SelectItem value='ALL'>Tất cả</SelectItem>
          {data.map((i) => (
            <SelectItem value={i.key}>{i.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
