import { HTMLInputTypeAttribute } from 'react'
import { Control } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from './button'
import { Calendar } from '../ui/calendar'

interface FormGroupProps {
  control: Control<any>
  label: string
  name: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  autoFocus?: boolean
  inputClassName?: string
  disabled?: boolean
}

export default function FormGroup({
  control,
  label,
  name,
  placeholder,
  type,
  autoFocus,
  inputClassName,
  disabled,
}: FormGroupProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full flex flex-col items-start'>
          <FormLabel className='text-sm font-medium text-black'>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 h-10 !mt-3 text-left font-normal border-[1.5px] text-[1rem] bg-white border-slate-300 rounded-md',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span className='!text-base text-placeHolder'>{placeholder}</span>
                  )}
                  <CalendarIcon className='ml-auto h-5 w-5 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                // disabled={(date) =>
                //   date > new Date() || date < new Date("1900-01-01")
                // }
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
