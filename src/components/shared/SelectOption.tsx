import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { FaAngleDown } from 'react-icons/fa6'

const options = [
  {
    optionName: 'Chọn danh mục',
    isPlaceholder: true,
  },
  {
    optionName: 'Tất cả',
  },
  {
    optionName: 'Sinh viên 5 tốt',
  },
  {
    optionName: 'Câu chuyện đẹp',
  },
  {
    optionName: 'Hỗ trợ sinh viên',
  },
  {
    optionName: 'NCKH',
  },
  {
    optionName: 'Xây dựng hội',
  },
]

const DocumentOptions = [
  {
    optionName: 'Chọn danh mục',
    isPlaceholder: true,
  },
  {
    optionName: 'Tất cả',
  },
  {
    optionName: 'Chương trình',
  },
  {
    optionName: 'Công văn',
  },
  {
    optionName: 'Hướng dẫn',
  },
  {
    optionName: 'Kế hoạch',
  },
  {
    optionName: 'Kế hoạch liên tịch',
  },
  {
    optionName: 'Thông báo',
  },
  {
    optionName: 'Thư mời',
  },
]

interface SelectOptionProps {
  className?: string
  isDocument?: boolean
}

export default function SelectOption({ className, isDocument }: SelectOptionProps) {
  const [selected, setSelected] = useState(isDocument ? DocumentOptions[0] : options[0])

  return (
    <div className={className}>
      <Listbox
        value={selected}
        onChange={(value) => {
          if (!value.isPlaceholder) {
            setSelected(value)
          }
        }}
      >
        <ListboxButton
          className={clsx(
            'relative flex gap-[0.625rem] items-center justify-between md:min-w-[10.353rem] text-nowrap md:w-auto w-full border-[1px] border-slate-300 rounded-lg bg-white leading-6 text-left text-sm text-slate-900',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
          )}
        >
          <span className='ml-3 my-2.5 text-sm'>{selected.optionName}</span>
          <FaAngleDown className='group pointer-events-none text-sm fill-slate-400 mr-3' />
        </ListboxButton>
        <ListboxOptions
          anchor='bottom'
          transition
          className={clsx(
            'max-md:w-full md:w-fit w-auto left-0 rounded-xl border border-white/5 bg-white z-10 p-1 shadow-xl [--anchor-gap:var(--spacing-1)] focus:outline-none',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
          )}
        >
          {!isDocument
            ? options.map((option) => (
              <ListboxOption
                key={option.optionName}
                value={option}
                className='group w-full flex cursor-pointer items-center gap-2 rounded-lg max-md:py-2.5 md:py-1.5 px-3 select-none hover:bg-slate-100 data-[focus]:bg-slate-100'
              >
                {!option.isPlaceholder && (
                  <FaCheck className='invisible size-4 font-normal fill-slate-700 group-data-[selected]:visible' />
                )}
                <div
                  className={clsx(
                    'text-sm',
                    option.isPlaceholder ? 'text-slate-400' : 'text-slate-700',
                  )}
                >
                  {option.optionName}
                </div>
              </ListboxOption>
            ))
            : DocumentOptions.map((option) => (
              <ListboxOption
                key={option.optionName}
                value={option}
                className='group w-full flex cursor-pointer items-center gap-2 rounded-lg max-md:py-2.5 md:py-1.5 px-3 select-none hover:bg-slate-100 data-[focus]:bg-slate-100'
              >
                {!option.isPlaceholder && (
                  <FaCheck className='invisible size-4 font-normal fill-slate-700 group-data-[selected]:visible' />
                )}
                <div
                  className={clsx(
                    'text-sm',
                    option.isPlaceholder ? 'text-slate-400' : 'text-slate-700',
                  )}
                >
                  {option.optionName}
                </div>
              </ListboxOption>
            ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}
