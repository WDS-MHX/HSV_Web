'use client'
import clsx from 'clsx'
import { FaCheck } from 'react-icons/fa6'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'

const options = [
  {
    optionName: 'Chọn danh mục',
    isPlaceholder: true,
  },
  {
    optionName: 'Tất cả',
  },
  {
    optionName: 'Giới thiệu',
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

// const DocumentOptions = [
//   {
//     optionName: 'Chọn danh mục',
//     isPlaceholder: true,
//   },
//   {
//     optionName: 'Chương trình',
//   },
//   {
//     optionName: 'Công văn',
//   },
//   {
//     optionName: 'Hướng dẫn',
//   },
//   {
//     optionName: 'Kế hoạch',
//   },
//   {
//     optionName: 'Kế hoạch liên tịch',
//   },
//   {
//     optionName: 'Thông báo',
//   },
//   {
//     optionName: 'Thư mời',
//   },
// ]

// export default function SelectOption({ className, isDocument }: SelectOptionProps) {
//   const [selected, setSelected] = useState(isDocument ? DocumentOptions[0] : options[0])

//   return (
//     <div className={className}>
//       {/* <Listbox
//         value={selected}
//         onChange={(value) => {
//           if (!value.isPlaceholder) {
//             setSelected(value)
//           }
//         }}
//       >
//         <ListboxButton
//           className={clsx(
//             'relative flex gap-[0.625rem] items-center justify-between md:min-w-[10.353rem] text-nowrap md:w-auto w-full border-[1px] border-slate-300 rounded-lg bg-white leading-6 text-left text-sm text-slate-900',
//             'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
//           )}
//         >
//           <span className='ml-3 my-2.5 text-sm'>{selected.optionName}</span>
//           <FaAngleDown className='group pointer-events-none text-sm fill-slate-400 mr-3' />
//         </ListboxButton>
//         <ListboxOptions
//           anchor='bottom'
//           transition
//           className={clsx(
//             'max-md:w-full md:w-fit w-auto left-0 rounded-xl border border-white/5 bg-white z-10 p-1 shadow-xl [--anchor-gap:var(--spacing-1)] focus:outline-none',
//             'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
//           )}
//         >
//           {!isDocument
//             ? options.map((option) => (
//                 <ListboxOption
//                   key={option.optionName}
//                   value={option}
//                   className='group w-full flex cursor-pointer items-center gap-2 rounded-lg max-md:py-2.5 md:py-1.5 px-3 select-none hover:bg-slate-100 data-[focus]:bg-slate-100'
//                 >
//                   {!option.isPlaceholder && (
//                     <FaCheck className='invisible size-4 font-normal fill-slate-700 group-data-[selected]:visible' />
//                   )}
//                   <div
//                     className={clsx(
//                       'text-sm',
//                       option.isPlaceholder ? 'text-slate-400' : 'text-slate-700',
//                     )}
//                   >
//                     {option.optionName}
//                   </div>
//                 </ListboxOption>
//               ))
//             : DocumentOptions.map((option) => (
//                 <ListboxOption
//                   key={option.optionName}
//                   value={option}
//                   className='group w-full flex cursor-pointer items-center gap-2 rounded-lg max-md:py-2.5 md:py-1.5 px-3 select-none hover:bg-slate-100 data-[focus]:bg-slate-100'
//                 >
//                   {!option.isPlaceholder && (
//                     <FaCheck className='invisible size-4 font-normal fill-slate-700 group-data-[selected]:visible' />
//                   )}
//                   <div
//                     className={clsx(
//                       'text-sm',
//                       option.isPlaceholder ? 'text-slate-400' : 'text-slate-700',
//                     )}
//                   >
//                     {option.optionName}
//                   </div>
//                 </ListboxOption>
//               ))}
//         </ListboxOptions>
//       </Listbox> */}
//     </div>
//   )
// }

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@/lib/utils'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex flex-row md:min-w-[10.553rem] gap-[0.625rem] text-nowrap md:w-auto w-full border-[1px] border-slate-300 rounded-lg items-center !bg-white text-left text-slate-900 justify-between whitespace-nowrap border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <FaAngleDown className='w-4 h-4 opacity-50' />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <FaAngleUp />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <FaAngleDown />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 pl-9 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative font-medium text-slate-700 flex w-full cursor-default select-none hover:bg-slate-100 items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className='flex h-4 w-4 m-1 mr-2 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <FaCheck className='h-4 w-4' />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
